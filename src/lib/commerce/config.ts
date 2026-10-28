import { CommerceError } from "./types";

type Environment = Record<string, string | undefined>;
export type CommerceConfig =
  | { mode: "demo" }
  | {
      mode: "live";
      domain: string;
      token: string;
      version: string;
      checkoutDomain?: string;
      checkoutVerified: boolean;
      mrpVerified: boolean;
    };

export function getCommerceConfig(
  env: Environment = process.env,
): CommerceConfig {
  const mode = env.STOREFRONT_MODE?.trim();
  const domain = env.SHOPIFY_STORE_DOMAIN?.trim().toLowerCase();
  const token = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
  if (mode && mode !== "demo" && mode !== "live") {
    throw new CommerceError(
      "Storefront mode is not configured correctly.",
      "INVALID_CONFIGURATION",
    );
  }
  if (mode === "demo") return { mode: "demo" };
  if (!domain && !token && mode !== "live") return { mode: "demo" };
  if (
    !domain ||
    !token ||
    !/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain)
  ) {
    throw new CommerceError(
      "The store connection is incomplete. Please try again later.",
      "INVALID_CONFIGURATION",
    );
  }
  const version = env.SHOPIFY_API_VERSION?.trim() || "2026-10";
  if (!/^20\d{2}-(01|04|07|10)$/.test(version)) {
    throw new CommerceError(
      "The store API version is not configured correctly.",
      "INVALID_CONFIGURATION",
    );
  }
  const checkoutDomain = env.SHOPIFY_CHECKOUT_DOMAIN?.trim().toLowerCase();
  if (
    checkoutDomain &&
    !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/.test(checkoutDomain)
  ) {
    throw new CommerceError(
      "The checkout domain is not configured correctly.",
      "INVALID_CONFIGURATION",
    );
  }
  return {
    mode: "live",
    domain,
    token,
    version,
    checkoutDomain,
    checkoutVerified: env.SHOPIFY_CHECKOUT_VERIFIED === "true",
    mrpVerified: env.SHOPIFY_MRP_VERIFIED === "true",
  };
}

export function safeCheckoutUrl(
  value: string,
  config: Extract<CommerceConfig, { mode: "live" }>,
): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new CommerceError(
      "Checkout is temporarily unavailable. Please try again.",
      "INVALID_CHECKOUT_URL",
    );
  }
  const allowed = [config.domain, config.checkoutDomain].filter(Boolean);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port ||
    !allowed.includes(url.hostname)
  ) {
    throw new CommerceError(
      "Checkout is temporarily unavailable. Please contact the store.",
      "INVALID_CHECKOUT_URL",
    );
  }
  return url.href;
}
