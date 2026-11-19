import { CONTRACT_ADDRESS, LCRN_EUR_RATE, TOKEN_DECIMALS } from "@/config/token";

const SOL_MINT = "So11111111111111111111111111111111111111112";
const LAMPORTS_PER_SOL = 1_000_000_000;

export type PriceSource = "dexscreener" | "jupiter" | "pumpfun" | "fallback";
export type LcrnPrice = { eurRate: number; source: PriceSource };

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

async function fetchUsdToEurRate(): Promise<number> {
  const data = await fetchJson("https://api.frankfurter.app/latest?from=USD&to=EUR");
  const rate = Number(data?.rates?.EUR);
  if (!Number.isFinite(rate) || rate <= 0) throw new Error("Taxa USD→EUR inválida.");
  return rate;
}

// Fonte primária: par já graduado para a Raydium/PumpSwap.
async function fetchFromDexscreener(): Promise<number | null> {
  const data = await fetchJson(
    `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
  );
  const priceUsd = Number(data?.pairs?.[0]?.priceUsd);
  return Number.isFinite(priceUsd) && priceUsd > 0 ? priceUsd : null;
}

// Fonte secundária: preço indexado pela Jupiter (cobre tokens já com rota de swap).
async function fetchJupiterUsdPrice(mint: string): Promise<number | null> {
  const data = await fetchJson(`https://api.jup.ag/tokens/v2/search?query=${mint}`);
  const priceUsd = Number(data?.[0]?.usdPrice);
  return Number.isFinite(priceUsd) && priceUsd > 0 ? priceUsd : null;
}

// Fonte pré-graduação: deriva o preço da reserva virtual da bonding curve do pump.fun.
// Nota: a API da pump.fun está protegida por Cloudflare e pode falhar mesmo a partir
// de um browser real (o desafio JS não é resolvível por um simples fetch()) — por
// isso esta fonte é best-effort, nunca a única.
async function fetchFromPumpFun(): Promise<number | null> {
  const data = await fetchJson(
    `https://frontend-api-v3.pump.fun/coins/${CONTRACT_ADDRESS}`
  );
  const virtualSolLamports = Number(data?.virtual_sol_reserves);
  const virtualTokenUnits = Number(data?.virtual_token_reserves);
  if (!virtualSolLamports || !virtualTokenUnits) return null;

  const priceInSol =
    virtualSolLamports / LAMPORTS_PER_SOL / (virtualTokenUnits / 10 ** TOKEN_DECIMALS);

  const solUsd = await fetchJupiterUsdPrice(SOL_MINT);
  if (!solUsd) return null;

  return priceInSol * solUsd;
}

export async function getLcrnPriceInEur(): Promise<LcrnPrice> {
  const attempts: Array<[PriceSource, () => Promise<number | null>]> = [
    ["dexscreener", fetchFromDexscreener],
    ["jupiter", () => fetchJupiterUsdPrice(CONTRACT_ADDRESS)],
    ["pumpfun", fetchFromPumpFun],
  ];

  for (const [source, fetcher] of attempts) {
    try {
      const priceUsd = await fetcher();
      if (priceUsd) {
        const usdToEur = await fetchUsdToEurRate();
        return { eurRate: priceUsd * usdToEur, source };
      }
    } catch {
      // Esta fonte falhou — tenta a seguinte.
    }
  }

  return { eurRate: LCRN_EUR_RATE, source: "fallback" };
}
