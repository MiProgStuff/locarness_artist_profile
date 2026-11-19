import { Gem, Tag, Vote } from "lucide-react";
import type { ComponentType } from "react";
import { TOKEN_SYMBOL } from "@/config/token";

type Pillar = {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Tag,
    title: "Pagamentos com Desconto",
    description: `15% a 20% de desconto imediato em merch e ativos digitais pagos em ${TOKEN_SYMBOL}.`,
  },
  {
    icon: Gem,
    title: "Passaporte VIP",
    description:
      "Acesso a faixas inéditas, stems e ficheiros 3D para detentores do token.",
  },
  {
    icon: Vote,
    title: "Governação Criativa",
    description:
      "Direito a voto nas capas e conceitos visuais dos próximos lançamentos.",
  },
];

export function UtilityPillars() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {PILLARS.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
            <Icon size={18} className="text-cyan-300" />
          </span>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs leading-relaxed text-neutral-400">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}
