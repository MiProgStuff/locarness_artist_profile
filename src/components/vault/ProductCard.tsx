import { Disc3, Shirt, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import type { Product, ProductType } from "@/data/products";
import { getDiscountedPriceEur } from "@/lib/pricing";
import { TOKEN_SYMBOL } from "@/config/token";

const TYPE_ICON: Record<ProductType, ComponentType<{ size?: number; className?: string }>> = {
  physical: Shirt,
  digital: Disc3,
  license: Sparkles,
};

export function ProductCard({
  product,
  onBuy,
}: {
  product: Product;
  onBuy: (product: Product) => void;
}) {
  const Icon = TYPE_ICON[product.type];
  const discountedPrice = getDiscountedPriceEur(product);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
        <Icon size={18} className="text-cyan-300" />
      </span>

      <div>
        <h3 className="text-sm font-semibold text-white">{product.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-400">
          {product.description}
        </p>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-mono text-sm text-white">
          {discountedPrice.toFixed(2)}€
        </span>
        <span className="font-mono text-xs text-neutral-500 line-through">
          {product.priceEur.toFixed(2)}€
        </span>
        <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          -{product.discountPercent}% em {TOKEN_SYMBOL}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onBuy(product)}
        className="mt-auto rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
      >
        Pagar com {TOKEN_SYMBOL}
      </button>
    </div>
  );
}
