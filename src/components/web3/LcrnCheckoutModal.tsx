"use client";

import { useEffect, useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  RadioTower,
  X,
} from "lucide-react";

import {
  ARTIST_RECEIVING_WALLET,
  CONTRACT_ADDRESS,
  LCRN_EUR_RATE,
  TOKEN_DECIMALS,
  TOKEN_SYMBOL,
} from "@/config/token";
import type { Product } from "@/data/products";
import { getDiscountedPriceEur, getPriceInLcrn } from "@/lib/pricing";
import { getLcrnPriceInEur, type PriceSource } from "@/lib/price-feed";
import { getTokenProgramId } from "@/lib/solana";

type Status = "idle" | "signing" | "confirming" | "confirmed" | "error";

const SOURCE_LABEL: Record<PriceSource, string> = {
  dexscreener: "cotação em tempo real (DexScreener)",
  jupiter: "cotação em tempo real (Jupiter)",
  pumpfun: "cotação em tempo real (bonding curve pump.fun)",
  fallback: "preço provisório — sem mercado ativo ainda",
};

export function LcrnCheckoutModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const [shipping, setShipping] = useState({ name: "", email: "", address: "" });

  const [priceFeed, setPriceFeed] = useState<{ eurRate: number; source: PriceSource }>(
    { eurRate: LCRN_EUR_RATE, source: "fallback" }
  );
  const [priceLoading, setPriceLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getLcrnPriceInEur()
      .then((result) => {
        if (!cancelled) setPriceFeed(result);
      })
      .finally(() => {
        if (!cancelled) setPriceLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const needsShippingForm = product.type === "physical";
  const shippingValid =
    !needsShippingForm ||
    (shipping.name.trim() && shipping.email.trim() && shipping.address.trim());

  const priceEur = useMemo(() => getDiscountedPriceEur(product), [product]);
  const priceLcrn = useMemo(
    () => getPriceInLcrn(product, priceFeed.eurRate),
    [product, priceFeed.eurRate]
  );

  const isBusy = status === "signing" || status === "confirming";

  async function handlePay() {
    if (!publicKey) {
      setWalletModalVisible(true);
      return;
    }
    if (!shippingValid) return;

    setErrorMessage(null);
    setStatus("signing");

    try {
      const mint = new PublicKey(CONTRACT_ADDRESS);
      const artist = new PublicKey(ARTIST_RECEIVING_WALLET);
      const programId = await getTokenProgramId(connection, mint);

      const buyerAta = await getAssociatedTokenAddress(mint, publicKey, false, programId);
      const artistAta = await getAssociatedTokenAddress(mint, artist, false, programId);

      const amount = BigInt(
        Math.round(priceLcrn * 10 ** TOKEN_DECIMALS)
      );

      const transaction = new Transaction().add(
        createAssociatedTokenAccountIdempotentInstruction(
          publicKey,
          artistAta,
          artist,
          mint,
          programId
        ),
        createTransferCheckedInstruction(
          buyerAta,
          mint,
          artistAta,
          publicKey,
          amount,
          TOKEN_DECIMALS,
          [],
          programId
        )
      );

      const sig = await sendTransaction(transaction, connection);
      setStatus("confirming");

      await connection.confirmTransaction(sig, "confirmed");

      setSignature(sig);
      setStatus("confirmed");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f10] p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 text-neutral-500 hover:text-white"
        >
          <X size={18} />
        </button>

        <h2 className="pr-6 text-lg font-semibold text-white">{product.name}</h2>
        <p className="mt-1 text-sm text-neutral-400">{product.description}</p>

        <div className="mt-4 flex flex-col gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-neutral-500">
              Preço com {product.discountPercent}% desconto
            </span>
            <span className="font-mono text-sm text-white">
              {priceEur.toFixed(2)}€ ·{" "}
              {priceLcrn.toLocaleString("pt-PT", { maximumFractionDigits: 0 })}{" "}
              {TOKEN_SYMBOL}
            </span>
          </div>
          <div
            className={`flex items-center gap-1.5 text-[11px] ${
              priceFeed.source === "fallback" ? "text-amber-400" : "text-emerald-400"
            }`}
          >
            {priceLoading ? (
              <Loader2 size={11} className="animate-spin" />
            ) : (
              <RadioTower size={11} />
            )}
            {priceLoading ? "A obter cotação…" : SOURCE_LABEL[priceFeed.source]}
          </div>
        </div>

        {needsShippingForm && status === "idle" && (
          <div className="mt-4 flex flex-col gap-2">
            <input
              value={shipping.name}
              onChange={(e) => setShipping((s) => ({ ...s, name: e.target.value }))}
              placeholder="Nome completo"
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400/50 focus:outline-none"
            />
            <input
              value={shipping.email}
              onChange={(e) => setShipping((s) => ({ ...s, email: e.target.value }))}
              placeholder="Email"
              type="email"
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400/50 focus:outline-none"
            />
            <textarea
              value={shipping.address}
              onChange={(e) => setShipping((s) => ({ ...s, address: e.target.value }))}
              placeholder="Morada de envio"
              rows={2}
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400/50 focus:outline-none"
            />
          </div>
        )}

        <div className="mt-5">
          {status === "idle" && (
            <button
              type="button"
              disabled={!shippingValid}
              onClick={handlePay}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 text-sm font-semibold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {publicKey ? `Pagar com ${TOKEN_SYMBOL}` : "Conectar Carteira"}
            </button>
          )}

          {isBusy && (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-300">
              <Loader2 size={16} className="animate-spin text-emerald-400" />
              {status === "signing"
                ? "A aguardar assinatura na carteira…"
                : "A confirmar na blockchain Solana…"}
            </div>
          )}

          {status === "confirmed" && signature && (
            <div className="flex flex-col gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} /> Pagamento Confirmado
              </span>
              <a
                href={`https://solscan.io/tx/${signature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-emerald-200 underline-offset-2 hover:underline"
              >
                Ver recibo no Solscan <ExternalLink size={13} />
              </a>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              <span className="flex items-center gap-2">
                <AlertTriangle size={16} /> Falha no pagamento
              </span>
              <p className="text-xs text-red-200/80">{errorMessage}</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="self-start text-xs text-red-200 underline-offset-2 hover:underline"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
