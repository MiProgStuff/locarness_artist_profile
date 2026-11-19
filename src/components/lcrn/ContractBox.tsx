"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, LineChart } from "lucide-react";
import {
  CONTRACT_ADDRESS,
  DEXSCREENER_PAIR_URL,
  PUMPFUN_URL,
} from "@/config/token";

export function ContractBox() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          Endereço do contrato
        </span>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5">
          <code className="flex-1 truncate font-mono text-xs text-neutral-200 sm:text-sm">
            {CONTRACT_ADDRESS}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copiar endereço do contrato"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-neutral-300 transition-colors hover:border-emerald-400/40 hover:text-white"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" /> Copiado!
              </>
            ) : (
              <>
                <Copy size={14} /> Copiar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={PUMPFUN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          Comprar no Pump.fun / Raydium
          <ExternalLink size={15} />
        </a>
        {DEXSCREENER_PAIR_URL ? (
          <a
            href={DEXSCREENER_PAIR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <LineChart size={15} />
            Ver Gráfico no DexScreener
          </a>
        ) : (
          <span
            title="Disponível quando o par existir no DexScreener"
            className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-medium text-neutral-500"
          >
            <LineChart size={15} />
            Gráfico brevemente
          </span>
        )}
      </div>
    </div>
  );
}
