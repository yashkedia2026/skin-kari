import { products } from "@/data/products";
import {
  CommerceError,
  type Cart,
  type CartAction,
  type Product,
} from "./types";
import { MAX_CART_LINES, MAX_QUANTITY } from "./validation";

export function getDemoProducts(): Product[] {
  return products.map((product) => ({
    id: `demo:${product.handle}`,
    handle: product.handle,
    title: product.title,
    description: product.description,
    images: [
      {
        url: product.image,
        altText: product.imageAlt,
        width: product.imageWidth || 1098,
        height: product.imageHeight || 1500,
      },
    ],
    // Selectable for the demo interaction; this is not a claim about live inventory.
    availableForSale: true,
    variants: [
      {
        id: `demo:${product.handle}:default`,
        title: "Single sheet mask",
        availableForSale: true,
        price: null,
        // Client-provided reference only; final selling prices remain unconfirmed.
        mrp: { amount: "499.00", currencyCode: "INR" },
      },
    ],
    source: "demo",
  }));
}

export function emptyCart(
  mode: "demo" | "live",
  checkoutEnabled = false,
): Cart {
  return {
    id: mode === "demo" ? "demo-cart" : "",
    lines: [],
    totalQuantity: 0,
    subtotal: null,
    checkoutUrl: null,
    checkoutEnabled: mode === "live" && checkoutEnabled,
    mode,
  };
}

function demoLine(
  product: Product,
  merchandiseId: string,
  quantity: number,
): Cart["lines"][number] {
  const variant = product.variants.find((item) => item.id === merchandiseId)!;
  return {
    id: `demo-line:${product.handle}:${product.variants.indexOf(variant)}`,
    quantity,
    productHandle: product.handle,
    title: product.title,
    variantTitle: variant.title,
    image: product.images[0]?.url,
    merchandiseId,
    unitPrice: null,
    unitMrp: variant.mrp ?? null,
  };
}

function recalculate(lines: Cart["lines"]): Cart {
  return {
    ...emptyCart("demo"),
    lines,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
  };
}

/** Cookie data carries only demo variant IDs and quantities, never prices or product copy. */
export function readDemoCart(
  cookie: string | undefined,
  products: Product[],
): Cart {
  if (!cookie || cookie.length > 3800) return emptyCart("demo");
  try {
    const data: unknown = JSON.parse(
      Buffer.from(cookie, "base64url").toString("utf8"),
    );
    if (!Array.isArray(data) || data.length > MAX_CART_LINES)
      return emptyCart("demo");
    const lines: Cart["lines"] = [];
    const seen = new Set<string>();
    for (const entry of data) {
      if (!Array.isArray(entry) || entry.length !== 2) return emptyCart("demo");
      const [id, quantity] = entry;
      if (
        typeof id !== "string" ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > MAX_QUANTITY ||
        seen.has(id)
      )
        return emptyCart("demo");
      seen.add(id);
      const product = products.find((item) =>
        item.variants.some((variant) => variant.id === id),
      );
      if (product) lines.push(demoLine(product, id, quantity));
    }
    return recalculate(lines);
  } catch {
    return emptyCart("demo");
  }
}

export function writeDemoCart(cart: Cart): string {
  const serialized = Buffer.from(
    JSON.stringify(
      cart.lines.map((line) => [line.merchandiseId, line.quantity]),
    ),
  ).toString("base64url");
  if (serialized.length > 3800)
    throw new CommerceError(
      "Your demo bag is full. Remove an item before adding another.",
      "CART_LIMIT",
      409,
    );
  return serialized;
}

export function mutateDemoCart(
  cart: Cart,
  action: CartAction,
  products: Product[],
): Cart {
  if (action.action === "checkout") {
    throw new CommerceError(
      "This is a demo bag. Checkout will be available when the live store is connected.",
      "DEMO_CHECKOUT_DISABLED",
      409,
    );
  }
  const lines = cart.lines.map((line) => ({ ...line }));
  if (action.action === "add") {
    const product = products.find((item) =>
      item.variants.some((variant) => variant.id === action.merchandiseId),
    );
    const variant = product?.variants.find(
      (item) => item.id === action.merchandiseId,
    );
    if (!product || !variant)
      throw new CommerceError(
        "That mask is no longer available. Please refresh the page.",
        "PRODUCT_NOT_FOUND",
        404,
      );
    if (!variant.availableForSale)
      throw new CommerceError(
        "That option is currently unavailable.",
        "SOLD_OUT",
        409,
      );
    const line = lines.find(
      (item) => item.merchandiseId === action.merchandiseId,
    );
    if ((line?.quantity || 0) + action.quantity > MAX_QUANTITY)
      throw new CommerceError(
        `You can add up to ${MAX_QUANTITY} of each item.`,
        "QUANTITY_LIMIT",
        409,
      );
    if (line) line.quantity += action.quantity;
    else {
      if (lines.length >= MAX_CART_LINES)
        throw new CommerceError(
          "Your bag is full. Remove an item before adding another.",
          "CART_LIMIT",
          409,
        );
      lines.push(demoLine(product, action.merchandiseId, action.quantity));
    }
  } else {
    const index = lines.findIndex((line) => line.id === action.lineId);
    if (index < 0)
      throw new CommerceError(
        "That item is no longer in your bag. Please refresh your bag.",
        "LINE_NOT_FOUND",
        404,
      );
    if (action.action === "remove") lines.splice(index, 1);
    else lines[index].quantity = action.quantity;
  }
  return recalculate(lines);
}
