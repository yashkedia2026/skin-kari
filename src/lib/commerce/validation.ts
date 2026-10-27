import { CommerceError, type CartAction } from "./types";

export const MAX_QUANTITY = 99;
export const MAX_CART_LINES = 40;

function invalid(
  message = "Please check the cart request and try again.",
): never {
  throw new CommerceError(message, "INVALID_REQUEST", 400);
}

export function validateQuantity(value: unknown): number {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < 1 ||
    value > MAX_QUANTITY
  ) {
    return invalid(`Choose a quantity between 1 and ${MAX_QUANTITY}.`);
  }
  return value;
}

function identifier(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.length < 1 ||
    value.length > 512 ||
    /[\u0000-\u0020\u007f]/.test(value)
  ) {
    return invalid("That cart item could not be identified.");
  }
  return value;
}

export function parseCartAction(value: unknown): CartAction {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return invalid();
  const data = value as Record<string, unknown>;
  const allowed: Record<string, string[]> = {
    add: ["action", "merchandiseId", "quantity"],
    update: ["action", "lineId", "quantity"],
    remove: ["action", "lineId"],
    checkout: ["action"],
  };
  if (typeof data.action !== "string" || !Object.hasOwn(allowed, data.action))
    return invalid();
  if (
    Object.keys(data).some(
      (key) => !allowed[data.action as string].includes(key),
    )
  )
    return invalid();
  switch (data.action) {
    case "add":
      return {
        action: "add",
        merchandiseId: identifier(data.merchandiseId),
        quantity: validateQuantity(data.quantity),
      };
    case "update":
      return {
        action: "update",
        lineId: identifier(data.lineId),
        quantity: validateQuantity(data.quantity),
      };
    case "remove":
      return { action: "remove", lineId: identifier(data.lineId) };
    case "checkout":
      return { action: "checkout" };
    default:
      return invalid();
  }
}

export function assertSameOrigin(request: Request, siteUrl?: string): void {
  const origin = request.headers.get("origin");
  let expected: string;
  try {
    const url = new URL(siteUrl || request.url);
    // Next can expose an internal hostname in request.url. A browser sends the public
    // Host independently of Origin and cannot replace it through fetch headers.
    // A configured public URL always wins, including behind a production proxy.
    const host = !siteUrl ? request.headers.get("host") : null;
    if (host) {
      if (/[\s/\\@?#]/.test(host)) throw new Error("Invalid host");
      const publicUrl = new URL(`${url.protocol}//${host}`);
      if (publicUrl.host !== host.toLowerCase())
        throw new Error("Invalid host");
      expected = publicUrl.origin;
    } else expected = url.origin;
    if (url.protocol !== "http:" && url.protocol !== "https:")
      throw new Error("Invalid protocol");
  } catch {
    throw new CommerceError(
      "The storefront origin is not configured correctly.",
      "INVALID_CONFIGURATION",
    );
  }
  if (
    !origin ||
    origin !== expected ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    throw new CommerceError(
      "Please update your cart from this storefront.",
      "INVALID_ORIGIN",
      403,
    );
  }
}
