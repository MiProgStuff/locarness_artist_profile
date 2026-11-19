import { TokenGate } from "@/components/web3/TokenGate";
import { VipPanel } from "@/components/web3/VipPanel";
import { TOKEN_SYMBOL } from "@/config/token";

export default function VaultVipPage() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-20 sm:px-6">
      <div className="flex flex-col gap-2 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
          The Vault
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          Área VIP Holders
        </h1>
        <p className="mx-auto max-w-xl text-sm text-neutral-400">
          Conteúdo exclusivo para quem acredita e detém {TOKEN_SYMBOL}.
        </p>
      </div>

      <TokenGate>
        <VipPanel />
      </TokenGate>
    </section>
  );
}
