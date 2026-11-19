"use client";

import { useState } from "react";
import { Check, Copy, ShieldCheck } from "lucide-react";
import { CONTRACT_ADDRESS, SOLSCAN_TOKEN_URL, TOKEN_SYMBOL } from "@/config/token";

function abbreviate(address: string) {
  if (address.startsWith("[") || address.length < 10) return address;
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function Footer() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Locarness. Todos os direitos reservados.</p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-200 transition-colors hover:border-emerald-400/40 hover:text-white"
          >
            <span>
              {TOKEN_SYMBOL}: {abbreviate(CONTRACT_ADDRESS)}
            </span>
            {copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} />
            )}
          </button>

          <a
            href={SOLSCAN_TOKEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            <ShieldCheck size={14} className="text-cyan-400" />
            Mint &amp; Freeze Authority Revogadas — verificado no Solscan
          </a>
        </div>
      </div>
    </footer>
  );
}
