"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { PackQuantity } from "@/lib/commerce/pricing";

const ProductPackContext = createContext<{
  quantity: PackQuantity;
  setQuantity: (quantity: PackQuantity) => void;
} | null>(null);

/** One selection drives the image, displayed price and existing cart action. */
export function ProductPackSelectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [quantity, setQuantity] = useState<PackQuantity>(1);
  return (
    <ProductPackContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </ProductPackContext.Provider>
  );
}

export function useProductPackSelection() {
  const selection = useContext(ProductPackContext);
  if (!selection) throw new Error("Product pack selection provider missing");
  return selection;
}
