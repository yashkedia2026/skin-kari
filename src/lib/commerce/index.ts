import "server-only";
import { cache } from "react";
import { getCommerceConfig } from "./config";
import { getDemoProducts } from "./demo";
import { shopifyProduct, shopifyProducts } from "./shopify";
import type { Product } from "./types";

export type { Product, Cart, Money } from "./types";
export { getDemoProducts } from "./demo";

export function isDemoMode(): boolean {
  return getCommerceConfig().mode === "demo";
}

export const getProducts = cache(async (): Promise<Product[]> =>
  isDemoMode() ? getDemoProducts() : shopifyProducts(),
);

export const getProduct = cache(
  async (handle: string): Promise<Product | null> => {
    if (!/^[a-z0-9][a-z0-9-]{0,254}$/.test(handle)) return null;
    return isDemoMode()
      ? getDemoProducts().find((product) => product.handle === handle) || null
      : shopifyProduct(handle);
  },
);
