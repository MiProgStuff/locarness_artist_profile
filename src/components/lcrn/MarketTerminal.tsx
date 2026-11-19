"use client";

import { useState } from "react";
import { ChevronDown, Download, LineChart, Repeat, Wallet } from "lucide-react";
import { DEXSCREENER_EMBED_URL, TOKEN_SYMBOL } from "@/config/token";
import type { ComponentType } from "react";

type Step = {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: Download,
    title: "1. Instalar Phantom",
    description:
      "Instala a extensão ou app Phantom (ou Solflare) e cria a tua carteira Solana — guarda a frase de recuperação em local seguro.",
  },
  {
    icon: Wallet,
    title: "2. Depositar SOL",
    description:
      "Compra SOL numa exchange (ex: Coinbase, Binance) ou diretamente na app Phantom e envia-o para o endereço da tua carteira.",
  },
  {
    icon: Repeat,
    title: `3. Trocar por ${TOKEN_SYMBOL}`,
    description:
      "Liga a carteira ao Pump.fun ou Raydium e troca o SOL por $LCRN usando o endereço do contrato oficial acima.",
  },
];

export function MarketTerminal() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <div className="aspect-[4/3] w-full sm:aspect-[16/10]">
          {DEXSCREENER_EMBED_URL ? (
            <iframe
              src={DEXSCREENER_EMBED_URL}
              title={`Gráfico de mercado ${TOKEN_SYMBOL}`}
              className="h-full w-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
              <LineChart size={22} className="text-neutral-600" />
              <p className="text-xs text-neutral-500">
                O gráfico fica disponível aqui quando o {TOKEN_SYMBOL} tiver um
                par ativo no DexScreener.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
          Como adquirir {TOKEN_SYMBOL} em 3 passos simples
        </h3>
        {STEPS.map((step, index) => {
          const isOpen = openStep === index;
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <button
                type="button"
                onClick={() => setOpenStep(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} className="text-emerald-400" />
                  <span className="text-sm font-medium text-white">
                    {step.title}
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  className={`text-neutral-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="px-4 pb-4 text-xs leading-relaxed text-neutral-400">
                  {step.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
