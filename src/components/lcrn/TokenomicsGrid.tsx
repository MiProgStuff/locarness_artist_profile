import { Coins, Lock, ShieldCheck, Zap } from "lucide-react";
import { SOLSCAN_TOKEN_URL } from "@/config/token";
import type { ComponentType } from "react";

type Card = {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  href?: string;
};

const CARDS: Card[] = [
  {
    icon: Zap,
    title: "Rede Solana",
    description: "Transações rápidas e taxas inferiores a $0.01.",
  },
  {
    icon: Coins,
    title: "Supply Fixo",
    description: "1.000.000.000 $LCRN — sem emissão adicional.",
  },
  {
    icon: Lock,
    title: "Contrato Seguro",
    description:
      "Mint Authority e Freeze Authority 100% revogadas — verificável on-chain.",
    href: SOLSCAN_TOKEN_URL,
  },
  {
    icon: ShieldCheck,
    title: "Liquidez Protegida",
    description:
      "Destinada a queima automática de LP na transição para a Raydium.",
  },
];

export function TokenomicsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map(({ icon: Icon, title, description, href }) => {
        const content = (
          <>
            <Icon size={20} className="text-emerald-400" />
            <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-neutral-400">
              {description}
            </p>
          </>
        );

        const className =
          "rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-emerald-400/30";

        return href ? (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {content}
          </a>
        ) : (
          <div key={title} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
