"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Loader2, Lock, ShieldAlert } from "lucide-react";

import { MIN_VIP_HOLDING, PUMPFUN_URL, TOKEN_SYMBOL } from "@/config/token";
import { getLcrnBalance } from "@/lib/solana";

type Status = "locked" | "checking" | "unavailable" | "insufficient" | "authorized";

type BalanceResult = { key: string; balance: number; ok: boolean };

export function TokenGate({ children }: { children: ReactNode }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const [result, setResult] = useState<BalanceResult | null>(null);

  useEffect(() => {
    if (!publicKey) return;

    let cancelled = false;
    const key = publicKey.toBase58();

    getLcrnBalance(connection, publicKey)
      .then((value) => {
        if (!cancelled) setResult({ key, balance: value, ok: true });
      })
      .catch(() => {
        if (!cancelled) setResult({ key, balance: 0, ok: false });
      });

    return () => {
      cancelled = true;
    };
  }, [publicKey, connection]);

  const currentKey = publicKey?.toBase58() ?? null;
  const isStale = result === null || result.key !== currentKey;
  const balance = isStale ? 0 : result.balance;

  const effectiveStatus: Status = !publicKey
    ? "locked"
    : isStale
      ? "checking"
      : !result.ok
        ? "unavailable"
        : result.balance >= MIN_VIP_HOLDING
          ? "authorized"
          : "insufficient";

  if (effectiveStatus === "authorized") {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
      {effectiveStatus === "locked" && (
        <>
          <Lock size={28} className="text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">
            Área reservada a detentores de {TOKEN_SYMBOL}
          </h3>
          <p className="max-w-sm text-sm text-neutral-400">
            Liga a tua carteira para verificarmos o teu saldo on-chain e
            desbloquear o conteúdo exclusivo.
          </p>
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Conectar Carteira para Verificar Acesso
          </button>
        </>
      )}

      {effectiveStatus === "checking" && (
        <>
          <Loader2 size={28} className="animate-spin text-emerald-400" />
          <p className="text-sm text-neutral-400">
            A verificar o teu saldo on-chain…
          </p>
        </>
      )}

      {effectiveStatus === "unavailable" && (
        <>
          <ShieldAlert size={28} className="text-amber-400" />
          <h3 className="text-lg font-semibold text-white">
            Verificação indisponível
          </h3>
          <p className="max-w-sm text-sm text-neutral-400">
            Não foi possível ler o saldo on-chain neste momento. Tenta
            novamente dentro de pouco.
          </p>
        </>
      )}

      {effectiveStatus === "insufficient" && (
        <>
          <Lock size={28} className="text-neutral-500" />
          <h3 className="text-lg font-semibold text-white">
            Saldo insuficiente
          </h3>
          <p className="max-w-sm text-sm text-neutral-400">
            Tens{" "}
            <span className="font-mono text-white">
              {balance.toLocaleString("pt-PT", { maximumFractionDigits: 0 })}{" "}
              {TOKEN_SYMBOL}
            </span>
            . Faltam{" "}
            <span className="font-mono text-white">
              {Math.max(MIN_VIP_HOLDING - balance, 0).toLocaleString("pt-PT", {
                maximumFractionDigits: 0,
              })}{" "}
              {TOKEN_SYMBOL}
            </span>{" "}
            para desbloquear o acesso VIP ({MIN_VIP_HOLDING.toLocaleString("pt-PT")}
            {" "}
            {TOKEN_SYMBOL} mínimo).
          </p>
          <a
            href={PUMPFUN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:border-emerald-400/40 hover:text-white"
          >
            Comprar mais {TOKEN_SYMBOL}
          </a>
        </>
      )}
    </div>
  );
}
