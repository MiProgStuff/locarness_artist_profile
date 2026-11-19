import type { Product } from "@/data/products";

export function getDiscountedPriceEur(product: Product) {
  return product.priceEur * (1 - product.discountPercent / 100);
}

export function getPriceInLcrn(product: Product, eurRate: number) {
  return getDiscountedPriceEur(product) / eurRate;
}
