import { createHash } from "node:crypto";
import { getCommerceConfig, safeCheckoutUrl } from "./config";
import { emptyCart } from "./demo";
import {
  CommerceError,
  type Cart,
  type CartAction,
  type Money,
  type Product,
} from "./types";
import { MAX_CART_LINES, MAX_QUANTITY } from "./validation";

type Connection<T> = {
  nodes: T[];
  pageInfo?: { hasNextPage: boolean; endCursor: string | null };
};
type ShopifyVariant = Product["variants"][number] & {
  image?: { url: string };
  product?: { handle: string; title: string };
};
type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  images: Connection<{
    url: string;
    altText?: string | null;
    width?: number;
    height?: number;
  }>;
  variants: Connection<ShopifyVariant>;
  metafields?: ({ key: string; value: string } | null)[];
};
type ShopifyCart = {
  id: string;
  totalQuantity: number;
  checkoutUrl: string;
  cost: { subtotalAmount: Money };
  lines: Connection<{
    id: string;
    quantity: number;
    cost: { amountPerQuantity: Money };
    merchandise: ShopifyVariant;
  }>;
};
type MutationPayload = {
  cart: ShopifyCart | null;
  userErrors: { message: string; code?: string }[];
  warnings?: { message: string }[];
};

const VARIANT_FIELDS = `id title availableForSale price { amount currencyCode } selectedOptions { name value }`;
const PRODUCT_FIELDS = `
  id handle title description availableForSale
  images(first: 20) { nodes { url altText width height } }
  variants(first: 250) { nodes { ${VARIANT_FIELDS} } pageInfo { hasNextPage endCursor } }
  metafields(identifiers: [
    { namespace: "custom", key: "benefits" },
    { namespace: "custom", key: "directions" },
    { namespace: "custom", key: "caution" },
    { namespace: "custom", key: "featured_ingredients" },
    { namespace: "custom", key: "net_content" }
  ]) { key value }
`;
const CART_FIELDS = `
  id totalQuantity checkoutUrl cost { subtotalAmount { amount currencyCode } }
  lines(first: 250) {
    nodes { id quantity cost { amountPerQuantity { amount currencyCode } } merchandise { ... on ProductVariant {
      ${VARIANT_FIELDS} image { url } product { handle title }
    } } }
    pageInfo { hasNextPage endCursor }
  }
`;

/** Called only from the server entrypoint and API route; tokens never enter a client bundle. */
export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const config = getCommerceConfig();
  if (config.mode !== "live")
    throw new CommerceError(
      "The live store is not connected.",
      "LIVE_STORE_DISABLED",
    );
  let response: Response;
  try {
    response = await fetch(
      `https://${config.domain}/api/${config.version}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": config.token,
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
        signal: AbortSignal.timeout(12_000),
      },
    );
  } catch {
    throw new CommerceError(
      "We couldn't reach the store. Please try again in a moment.",
      "STORE_UNREACHABLE",
    );
  }
  if (!response.ok) {
    throw new CommerceError(
      response.status === 429
        ? "The store is busy. Please try again in a moment."
        : "The store is temporarily unavailable. Please try again.",
      "STORE_UNAVAILABLE",
    );
  }
  let payload: { data?: T; errors?: unknown[] };
  try {
    payload = await response.json();
  } catch {
    throw new CommerceError(
      "The store returned an incomplete response. Please try again.",
      "INVALID_STORE_RESPONSE",
    );
  }
  if (payload.errors?.length || !payload.data) {
    throw new CommerceError(
      "The store couldn't complete that request. Please try again.",
      "STORE_API_ERROR",
    );
  }
  return payload.data;
}

function listValue(value: string | undefined): string[] | undefined {
  if (!value) return undefined;
  try {
    const list: unknown = JSON.parse(value);
    return Array.isArray(list) &&
      list.length > 0 &&
      list.every((item) => typeof item === "string" && item.trim())
      ? list
      : undefined;
  } catch {
    return undefined;
  }
}

export function normalizeProduct(product: ShopifyProduct): Product {
  const fields = Object.fromEntries(
    (product.metafields || [])
      .filter((field) => field !== null)
      .map((field) => [field.key, field.value]),
  );
  let featuredIngredients: { name: string; description: string }[] | undefined;
  try {
    const ingredients: unknown = JSON.parse(
      fields.featured_ingredients || "null",
    );
    if (
      Array.isArray(ingredients) &&
      ingredients.length > 0 &&
      ingredients.every(
        (ingredient) =>
          ingredient &&
          typeof ingredient === "object" &&
          typeof ingredient.name === "string" &&
          ingredient.name.trim() &&
          typeof ingredient.description === "string" &&
          ingredient.description.trim(),
      )
    )
      featuredIngredients = ingredients.map(({ name, description }) => ({
        name,
        description,
      }));
  } catch {
    /* Invalid merchant JSON is omitted; approved editorial content can remain the fallback. */
  }
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    availableForSale: product.availableForSale,
    images: product.images.nodes.map((image) => ({
      ...image,
      altText: image.altText || `${product.title} product image`,
    })),
    variants: product.variants.nodes.map(
      ({ id, title, availableForSale, price, selectedOptions }) => ({
        id,
        title,
        availableForSale,
        price,
        selectedOptions,
      }),
    ),
    source: "shopify",
    details: {
      benefits: listValue(fields.benefits),
      directions: listValue(fields.directions),
      caution: listValue(fields.caution),
      featuredIngredients,
      netContent: fields.net_content?.trim() || undefined,
    },
  };
}

async function allVariants(product: ShopifyProduct): Promise<ShopifyProduct> {
  let pageInfo = product.variants.pageInfo;
  while (pageInfo?.hasNextPage) {
    if (!pageInfo.endCursor)
      throw new CommerceError(
        "Product options could not be loaded.",
        "INVALID_STORE_RESPONSE",
      );
    const data = await storefront<{
      product: { variants: Connection<ShopifyVariant> } | null;
    }>(
      `
      query ProductOptions($id: ID!, $after: String) @inContext(country: IN) {
        product(id: $id) { variants(first: 250, after: $after) { nodes { ${VARIANT_FIELDS} } pageInfo { hasNextPage endCursor } } }
      }`,
      { id: product.id, after: pageInfo.endCursor },
    );
    if (!data.product)
      throw new CommerceError(
        "That product is no longer available.",
        "PRODUCT_NOT_FOUND",
        404,
      );
    product.variants.nodes.push(...data.product.variants.nodes);
    const next = data.product.variants.pageInfo;
    if (next?.hasNextPage && next.endCursor === pageInfo.endCursor)
      throw new CommerceError(
        "Product options could not be loaded.",
        "INVALID_STORE_RESPONSE",
      );
    pageInfo = next;
  }
  return product;
}

export async function shopifyProducts(): Promise<Product[]> {
  const products: Product[] = [];
  let after: string | null = null;
  do {
    const data: { products: Connection<ShopifyProduct> } = await storefront(
      `
      query Products($after: String) @inContext(country: IN) {
        products(first: 100, after: $after) { nodes { ${PRODUCT_FIELDS} } pageInfo { hasNextPage endCursor } }
      }`,
      { after },
    );
    products.push(
      ...(await Promise.all(
        data.products.nodes.map(async (product) =>
          normalizeProduct(await allVariants(product)),
        ),
      )),
    );
    if (!data.products.pageInfo?.hasNextPage) break;
    const nextCursor = data.products.pageInfo.endCursor;
    if (!nextCursor || nextCursor === after)
      throw new CommerceError(
        "Products could not be loaded.",
        "INVALID_STORE_RESPONSE",
      );
    after = nextCursor;
  } while (after);
  return products;
}

export async function shopifyProduct(handle: string): Promise<Product | null> {
  const data = await storefront<{ product: ShopifyProduct | null }>(
    `
    query Product($handle: String!) @inContext(country: IN) { product(handle: $handle) { ${PRODUCT_FIELDS} } }
  `,
    { handle },
  );
  return data.product
    ? normalizeProduct(await allVariants(data.product))
    : null;
}

export function normalizeCart(
  cart: ShopifyCart,
  warnings?: { message: string }[],
): Cart {
  if (cart.lines.pageInfo?.hasNextPage)
    throw new CommerceError(
      "This bag has too many items to display. Please contact the store.",
      "CART_LIMIT",
      409,
    );
  return {
    id: createHash("sha256").update(cart.id).digest("hex").slice(0, 24),
    lines: cart.lines.nodes.map((line) => ({
      id: line.id,
      quantity: line.quantity,
      productHandle: line.merchandise.product?.handle || "",
      title: line.merchandise.product?.title || "Product",
      variantTitle: line.merchandise.title,
      image: line.merchandise.image?.url,
      merchandiseId: line.merchandise.id,
      unitPrice: line.cost.amountPerQuantity,
    })),
    totalQuantity: cart.totalQuantity,
    subtotal: cart.cost.subtotalAmount,
    checkoutUrl: null,
    mode: "live",
    ...(warnings?.length
      ? { warnings: warnings.map((warning) => warning.message) }
      : {}),
  };
}

export function validCartCookie(value: string | undefined): string | undefined {
  // Shopify documents that token formats can change. Preserve the full ID, including its secret key.
  return value &&
    value.length <= 3500 &&
    value.startsWith("gid://shopify/Cart/") &&
    !/[\u0000-\u0020\u007f]/.test(value)
    ? value
    : undefined;
}

async function rawCart(id: string): Promise<ShopifyCart | null> {
  const data = await storefront<{ cart: ShopifyCart | null }>(
    `query Cart($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`,
    { id },
  );
  if (data.cart?.lines.pageInfo?.hasNextPage)
    throw new CommerceError(
      "This bag has too many items to display. Please contact the store.",
      "CART_LIMIT",
      409,
    );
  return data.cart;
}

export async function getLiveCart(
  id: string | undefined,
): Promise<{ cart: Cart; cartId?: string }> {
  if (!id) return { cart: emptyCart("live") };
  const cart = await rawCart(id);
  return cart
    ? { cart: normalizeCart(cart), cartId: cart.id }
    : { cart: emptyCart("live") };
}

async function variantAvailable(id: string): Promise<void> {
  if (!/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(id))
    throw new CommerceError(
      "That product option is not valid.",
      "INVALID_VARIANT",
      400,
    );
  const data = await storefront<{
    node: { id: string; availableForSale: boolean } | null;
  }>(
    `
    query AvailableVariant($id: ID!) @inContext(country: IN) { node(id: $id) { ... on ProductVariant { id availableForSale } } }
  `,
    { id },
  );
  if (!data.node?.id)
    throw new CommerceError(
      "That option is no longer available. Please refresh the product page.",
      "PRODUCT_NOT_FOUND",
      404,
    );
  if (!data.node.availableForSale)
    throw new CommerceError(
      "That option has sold out. Please choose another.",
      "SOLD_OUT",
      409,
    );
}

export async function mutateLiveCart(
  id: string | undefined,
  action: Exclude<CartAction, { action: "checkout" }>,
): Promise<{ cart: Cart; cartId: string }> {
  const existing = id ? await rawCart(id) : null;
  let field: string;
  let declarations: string;
  let argumentsText: string;
  let variables: Record<string, unknown>;
  if (action.action === "add") {
    await variantAvailable(action.merchandiseId);
    const line = existing?.lines.nodes.find(
      (item) => item.merchandise.id === action.merchandiseId,
    );
    if ((line?.quantity || 0) + action.quantity > MAX_QUANTITY)
      throw new CommerceError(
        `You can add up to ${MAX_QUANTITY} of each item.`,
        "QUANTITY_LIMIT",
        409,
      );
    if (!line && (existing?.lines.nodes.length || 0) >= MAX_CART_LINES)
      throw new CommerceError(
        "Your bag is full. Remove an item before adding another.",
        "CART_LIMIT",
        409,
      );
    const lines = [
      { merchandiseId: action.merchandiseId, quantity: action.quantity },
    ];
    if (existing) {
      field = "cartLinesAdd";
      declarations = "$cartId: ID!, $lines: [CartLineInput!]!";
      argumentsText = "cartId: $cartId, lines: $lines";
      variables = { cartId: existing.id, lines };
    } else {
      field = "cartCreate";
      declarations = "$input: CartInput!";
      argumentsText = "input: $input";
      variables = { input: { lines, buyerIdentity: { countryCode: "IN" } } };
    }
  } else {
    if (!existing)
      throw new CommerceError(
        "Your bag has expired. Please add your masks again.",
        "CART_EXPIRED",
        409,
      );
    const line = existing.lines.nodes.find((item) => item.id === action.lineId);
    if (!line)
      throw new CommerceError(
        "That item is no longer in your bag. Please refresh your bag.",
        "LINE_NOT_FOUND",
        404,
      );
    if (action.action === "remove") {
      field = "cartLinesRemove";
      declarations = "$cartId: ID!, $lineIds: [ID!]!";
      argumentsText = "cartId: $cartId, lineIds: $lineIds";
      variables = { cartId: existing.id, lineIds: [action.lineId] };
    } else {
      if (action.quantity > line.quantity)
        await variantAvailable(line.merchandise.id);
      field = "cartLinesUpdate";
      declarations = "$cartId: ID!, $lines: [CartLineUpdateInput!]!";
      argumentsText = "cartId: $cartId, lines: $lines";
      variables = {
        cartId: existing.id,
        lines: [{ id: action.lineId, quantity: action.quantity }],
      };
    }
  }
  const data = await storefront<Record<string, MutationPayload>>(
    `
    mutation ChangeCart(${declarations}) { ${field}(${argumentsText}) {
      cart { ${CART_FIELDS} } userErrors { code message } warnings { message }
    } }
  `,
    variables,
  );
  const result = data[field];
  if (result.userErrors.length)
    throw new CommerceError(
      result.userErrors[0].message || "That item could not be updated.",
      "CART_UPDATE_FAILED",
      409,
    );
  if (!result.cart)
    throw new CommerceError(
      "The store couldn't update your bag. Please try again.",
      "CART_UPDATE_FAILED",
    );
  const warnings = [...(result.warnings || [])];
  if (id && !existing)
    warnings.unshift({
      message:
        "Your previous bag expired. We started a new bag with this item.",
    });
  return { cart: normalizeCart(result.cart, warnings), cartId: result.cart.id };
}

export async function liveCheckout(id: string | undefined): Promise<string> {
  if (!id)
    throw new CommerceError(
      "Add a mask to your bag before checking out.",
      "EMPTY_CART",
      409,
    );
  const cart = await rawCart(id);
  if (!cart?.totalQuantity)
    throw new CommerceError(
      "Your bag is empty or has expired. Please add your masks again.",
      "EMPTY_CART",
      409,
    );
  const config = getCommerceConfig();
  if (config.mode !== "live")
    throw new CommerceError(
      "Live checkout is not available.",
      "LIVE_STORE_DISABLED",
    );
  return safeCheckoutUrl(cart.checkoutUrl, config);
}
