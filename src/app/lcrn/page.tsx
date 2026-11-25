import { ContractBox } from "@/components/lcrn/ContractBox";
import { TokenomicsGrid } from "@/components/lcrn/TokenomicsGrid";
import { UtilityPillars } from "@/components/lcrn/UtilityPillars";
import { MarketTerminal } from "@/components/lcrn/MarketTerminal";
import { TOKEN_SYMBOL } from "@/config/token";

export default function LcrnPage() {
  return (
    <div className="flex flex-col gap-24 px-4 py-20 sm:px-6">
      {/* Hero & Prova de Autoria */}
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
          Ecossistema {TOKEN_SYMBOL}
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-5xl">
          {TOKEN_SYMBOL} — A Moeda Oficial do Ecossistema Locarness
        </h1>
        <p className="max-w-xl text-sm text-neutral-400 sm:text-base">
          O token conecta o artista aos seus apoiantes através de acesso
          exclusivo, governação criativa e comércio direto — construído
          publicamente na rede Solana, sem intermediários.
        </p>
        <div className="w-full max-w-xl">
          <ContractBox />
        </div>
      </section>

      {/* Segurança & Tokenomics */}
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            Segurança &amp; Tokenomics
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Factos verificáveis sobre o contrato, não promessas.
          </p>
        </div>
        <TokenomicsGrid />
      </section>

      {/* Utilidade Real */}
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            Utilidade Real
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            O que {TOKEN_SYMBOL} desbloqueia hoje, não apenas no futuro.
          </p>
        </div>
        <UtilityPillars />
      </section>

      {/* Terminal de Mercado & Guia Rápido */}
      <section
        id="mercado"
        className="mx-auto flex w-full max-w-5xl flex-col gap-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            Terminal de Mercado
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Acompanha o preço em tempo real e aprende a adquirir{" "}
            {TOKEN_SYMBOL} sem experiência prévia em cripto.
          </p>
        </div>
        <MarketTerminal />
      </section>
    </div>
  );
}
