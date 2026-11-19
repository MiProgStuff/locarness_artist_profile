export const TOKEN_NAME = "Locarness";
export const TOKEN_SYMBOL = "$LCRN";

// TODO: substituir pelos valores reais depois do lançamento no pump.fun.
export const CONTRACT_ADDRESS = "J68rezCzLGfDAp6Pd1RsesW53BBJVVkL36EHMpvZpump";
export const PUMPFUN_URL = `https://pump.fun/${CONTRACT_ADDRESS}`;
// TODO: preencher quando o par existir no DexScreener (o token ainda está na bonding curve do pump.fun).
export const DEXSCREENER_PAIR_URL = "";
export const DEXSCREENER_EMBED_URL = DEXSCREENER_PAIR_URL.startsWith("http")
  ? `${DEXSCREENER_PAIR_URL}?embed=1&theme=dark`
  : DEXSCREENER_PAIR_URL;
export const ARTIST_RECEIVING_WALLET = "FjevNkyucbc8bNCNBy9ZEQrWWSg5YwTFiV9Srjn95vMb";
export const SOLSCAN_TOKEN_URL = `https://solscan.io/token/${CONTRACT_ADDRESS}`;

// Decimais do token SPL (padrão pump.fun = 6). Confirmar no Solscan após o lançamento.
export const TOKEN_DECIMALS = 6;

// TODO: substituir por uma cotação em tempo real (ex: API da DexScreener) antes de ir a produção.
// Esta taxa fixa é só placeholder para o checkout funcionar durante o desenvolvimento.
export const LCRN_EUR_RATE = 0.0001;

export const MIN_VIP_HOLDING = 100_000;

// TODO: preencher com o link de convite privado (ex: Discord/Telegram) quando existir.
export const VIP_INVITE_URL = "";

export const SOCIAL_LINKS = {
  instagram: "",
  x: "",
  tiktok: "",
  soundcloud: "",
  spotify: "",
} as const;
