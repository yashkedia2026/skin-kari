export type Money = { amount: string; currencyCode: string };

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: { url: string; altText: string; width?: number; height?: number }[];
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: Money | null;
    /** Demo: provisional MRP. Live: comparison price confirmed by the merchant as MRP. */
    mrp?: Money | null;
    selectedOptions?: { name: string; value: string }[];
  }[];
  availableForSale: boolean;
  source: "demo" | "shopify";
  details?: {
    benefits?: string[];
    directions?: string[];
    featuredIngredients?: { name: string; description: string }[];
    caution?: string[];
    netContent?: string;
  };
};

export type Cart = {
  /** Public opaque identifier. The Shopify cart secret stays in an HttpOnly cookie. */
  id: string;
  lines: {
    id: string;
    quantity: number;
    productHandle: string;
    title: string;
    variantTitle: string;
    image?: string;
    merchandiseId: string;
    unitPrice: Money | null;
    unitMrp?: Money | null;
  }[];
  totalQuantity: number;
  subtotal: Money | null;
  /** Checkout is retrieved fresh through POST action: checkout. */
  checkoutUrl: string | null;
  /** Server permission; live credentials alone do not enable checkout. */
  checkoutEnabled: boolean;
  mode: "demo" | "live";
  warnings?: string[];
};

export type CartAction =
  | { action: "add"; merchandiseId: string; quantity: number }
  | { action: "update"; lineId: string; quantity: number }
  | { action: "remove"; lineId: string }
  | { action: "checkout" };

export class CommerceError extends Error {
  constructor(
    message: string,
    public code = "COMMERCE_UNAVAILABLE",
    public status = 503,
  ) {
    super(message);
    this.name = "CommerceError";
  }
}
