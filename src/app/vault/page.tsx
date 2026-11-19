"use client";

import { useState } from "react";
import Link from "next/link";
import { Gem } from "lucide-react";
import { ProductCard } from "@/components/vault/ProductCard";
import { LcrnCheckoutModal } from "@/components/web3/LcrnCheckoutModal";
import { PRODUCTS, type Product } from "@/data/products";
import { MIN_VIP_HOLDING, TOKEN_SYMBOL } from "@/config/token";

export default function VaultPage() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-20 sm:px-6">
      <div className="flex flex-col gap-2 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
          The Vault
        </p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          Loja Oficial
        </h1>
        <p className="mx-auto max-w-xl text-sm text-neutral-400">
          Merch, samples e arte exclusiva. Paga em {TOKEN_SYMBOL} e recebe
          desconto imediato — a transação é assinada diretamente na tua
          carteira, sem intermediários.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBuy={setActiveProduct}
          />
        ))}
      </div>

      <Link
        href="/vault/vip"
        className="flex flex-col gap-3 rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-transparent p-6 transition-colors hover:border-emerald-400/40 sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="flex items-center gap-3">
          <Gem size={20} className="text-emerald-300" />
          <span>
            <span className="block text-sm font-semibold text-white">
              Área VIP Holders
            </span>
            <span className="block text-xs text-neutral-400">
              Detém pelo menos{" "}
              {MIN_VIP_HOLDING.toLocaleString("pt-PT")} {TOKEN_SYMBOL} para
              desbloquear faixas inéditas, arte 3D e a comunidade privada.
            </span>
          </span>
        </span>
        <span className="text-xs font-medium text-emerald-300">
          Entrar na área VIP →
        </span>
      </Link>

      {activeProduct && (
        <LcrnCheckoutModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </section>
  );
}
