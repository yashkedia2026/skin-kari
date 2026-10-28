import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { GET, POST } from "../src/app/api/cart/route";
import { getCommerceConfig, safeCheckoutUrl } from "../src/lib/commerce/config";
import {
  emptyCart,
  getDemoProducts,
  mutateDemoCart,
  readDemoCart,
  writeDemoCart,
} from "../src/lib/commerce/demo";
import {
  assertSameOrigin,
  parseCartAction,
} from "../src/lib/commerce/validation";
import { CommerceError, type Product } from "../src/lib/commerce/types";
import {
  getLiveCart,
  liveCheckout,
  mutateLiveCart,
  normalizeCart,
  normalizeProduct,
  shopifyProduct as getShopifyProduct,
  shopifyProducts,
  storefront,
  validCartCookie,
} from "../src/lib/commerce/shopify";

const product: Product = {
  id: "demo:test-mask",
  handle: "test-mask",
  title: "Test mask",
  description: "Approved description",
  images: [{ url: "/test.png", altText: "Test mask packaging" }],
  variants: [
    {
      id: "demo:test-mask:default",
      title: "Single mask",
      availableForSale: true,
      price: null,
    },
  ],
  availableForSale: true,
  source: "demo",
};
const variantId = "gid://shopify/ProductVariant/100";
const secretId = "gid://shopify/Cart/test-token?key=private-cart-secret";
const shopifyProduct = {
  id: "gid://shopify/Product/1",
  handle: "test-mask",
  title: "Real mask",
  description: "Merchant description",
  availableForSale: true,
  images: {
    nodes: [{ url: "https://cdn.shopify.com/product.png", altText: null }],
  },
  variants: {
    nodes: [
      {
        id: variantId,
        title: "1 mask",
        availableForSale: true,
        price: { amount: "299.00", currencyCode: "INR" },
      },
    ],
  },
  metafields: [
    { key: "benefits", value: '["Merchant approved benefit"]' },
    { key: "directions", value: "broken-json" },
    {
      key: "featured_ingredients",
      value: '[{"name":"Vitamin C","description":"Merchant approved copy"}]',
    },
    { key: "net_content", value: "20 ml" },
  ],
};
const shopifyCart = {
  id: secretId,
  totalQuantity: 2,
  checkoutUrl: "https://test-store.myshopify.com/checkouts/test",
  cost: { subtotalAmount: { amount: "598.00", currencyCode: "INR" } },
  lines: {
    nodes: [
      {
        id: "gid://shopify/CartLine/1",
        quantity: 2,
        cost: { amountPerQuantity: { amount: "299.00", currencyCode: "INR" } },
        merchandise: {
          ...shopifyProduct.variants.nodes[0],
          image: { url: "https://cdn.shopify.com/product.png" },
          product: { handle: "test-mask", title: "Real mask" },
        },
      },
    ],
  },
};
const liveEnvironment = {
  STOREFRONT_MODE: "live",
  SHOPIFY_STORE_DOMAIN: "test-store.myshopify.com",
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: "test-token",
};

function withLiveEnvironment(
  t: TestContext,
  checkoutVerified = false,
  mrpVerified = false,
) {
  for (const [name, value] of Object.entries({
    ...liveEnvironment,
    SHOPIFY_CHECKOUT_VERIFIED: String(checkoutVerified),
    SHOPIFY_MRP_VERIFIED: String(mrpVerified),
  })) {
    const previous = process.env[name];
    process.env[name] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[name];
      else process.env[name] = previous;
    });
  }
  for (const name of ["SHOPIFY_API_VERSION", "SHOPIFY_CHECKOUT_DOMAIN"]) {
    const previous = process.env[name];
    delete process.env[name];
    t.after(() => {
      if (previous !== undefined) process.env[name] = previous;
    });
  }
}

test("demo defaults require absent credentials; incomplete live configuration fails closed", () => {
  assert.deepEqual(getCommerceConfig({}), { mode: "demo" });
  assert.deepEqual(
    getCommerceConfig({ ...liveEnvironment, STOREFRONT_MODE: "demo" }),
    { mode: "demo" },
  );
  assert.throws(
    () =>
      getCommerceConfig({ SHOPIFY_STORE_DOMAIN: "test-store.myshopify.com" }),
    { code: "INVALID_CONFIGURATION" },
  );
  assert.throws(() => getCommerceConfig({ STOREFRONT_MODE: "live" }), {
    code: "INVALID_CONFIGURATION",
  });
  assert.throws(() =>
    getCommerceConfig({
      ...liveEnvironment,
      SHOPIFY_STORE_DOMAIN: "https://evil.test",
    }),
  );
  assert.throws(() =>
    getCommerceConfig({ ...liveEnvironment, SHOPIFY_API_VERSION: "unstable" }),
  );
  assert.equal(getCommerceConfig(liveEnvironment).mode, "live");
});

test("live credentials do not enable checkout without an explicit verification flag", () => {
  for (const flag of [undefined, "false", "1", "TRUE", " true "]) {
    const config = getCommerceConfig({
      ...liveEnvironment,
      SHOPIFY_CHECKOUT_VERIFIED: flag,
    });
    assert.equal(config.mode === "live" && config.checkoutVerified, false);
  }
  const config = getCommerceConfig({
    ...liveEnvironment,
    SHOPIFY_CHECKOUT_VERIFIED: "true",
  });
  assert.equal(config.mode === "live" && config.checkoutVerified, true);
});

test("MRP verification is explicit and independent of checkout verification", () => {
  for (const flag of [undefined, "false", "1", "TRUE", " true "]) {
    const config = getCommerceConfig({
      ...liveEnvironment,
      SHOPIFY_CHECKOUT_VERIFIED: "true",
      SHOPIFY_MRP_VERIFIED: flag,
    });
    assert.equal(config.mode === "live" && config.mrpVerified, false);
  }
  const config = getCommerceConfig({
    ...liveEnvironment,
    SHOPIFY_MRP_VERIFIED: "true",
  });
  assert.equal(config.mode === "live" && config.mrpVerified, true);
  assert.equal(config.mode === "live" && config.checkoutVerified, false);
});

test("all demo masks expose only provisional MRP and every pack persists its exact quantity", () => {
  const catalogue = getDemoProducts();
  for (const mask of catalogue) {
    const variant = mask.variants[0];
    assert.equal(variant.price, null);
    assert.deepEqual(variant.mrp, { amount: "499.00", currencyCode: "INR" });
    for (const quantity of [1, 3, 6, 9, 12]) {
      const cart = mutateDemoCart(
        emptyCart("demo"),
        parseCartAction({ action: "add", merchandiseId: variant.id, quantity }),
        catalogue,
      );
      assert.equal(cart.totalQuantity, quantity);
      assert.equal(cart.lines.length, 1);
      assert.equal(cart.lines[0].merchandiseId, variant.id);
      assert.equal(cart.lines[0].quantity, quantity);
      assert.deepEqual(cart.lines[0].unitMrp, variant.mrp);
      assert.equal(cart.lines[0].unitPrice, null);
      assert.equal(cart.subtotal, null);
      assert.equal(cart.checkoutEnabled, false);
      assert.deepEqual(readDemoCart(writeDemoCart(cart), catalogue), cart);
    }
  }
});

test("cart actions reject coercion, unsafe quantities, unknown properties and unknown actions", () => {
  for (const quantity of [0, -1, 1.5, 100, "1", null, NaN]) {
    assert.throws(
      () =>
        parseCartAction({ action: "add", merchandiseId: variantId, quantity }),
      { code: "INVALID_REQUEST" },
    );
  }
  for (const body of [
    null,
    [],
    { action: "__proto__" },
    { action: "checkout", url: "https://evil.test" },
    { action: "remove", lineId: "a\nb" },
  ]) {
    assert.throws(() => parseCartAction(body), { code: "INVALID_REQUEST" });
  }
  assert.deepEqual(
    parseCartAction({ action: "add", merchandiseId: variantId, quantity: 2 }),
    { action: "add", merchandiseId: variantId, quantity: 2 },
  );
});

test("cart mutations require the configured same origin", () => {
  const request = (origin?: string) =>
    new Request("https://store.test/api/cart", {
      headers: origin ? { origin } : {},
    });
  assert.doesNotThrow(() => assertSameOrigin(request("https://store.test")));
  assert.throws(() => assertSameOrigin(request()), { code: "INVALID_ORIGIN" });
  assert.throws(() => assertSameOrigin(request("https://evil.test")), {
    code: "INVALID_ORIGIN",
  });
  assert.throws(
    () =>
      assertSameOrigin(
        request("https://store.test"),
        "https://real-store.test",
      ),
    { code: "INVALID_ORIGIN" },
  );
  const proxied = new Request("http://localhost:3000/api/cart", {
    headers: { host: "127.0.0.1:3000", origin: "http://127.0.0.1:3000" },
  });
  assert.doesNotThrow(() => assertSameOrigin(proxied));
  assert.throws(() => assertSameOrigin(proxied, "https://store.test"), {
    code: "INVALID_ORIGIN",
  });
  assert.throws(
    () =>
      assertSameOrigin(
        new Request("http://localhost:3000/api/cart", {
          headers: { host: "127.0.0.1:3000", origin: "http://evil.test" },
        }),
      ),
    { code: "INVALID_ORIGIN" },
  );
  assert.throws(
    () =>
      assertSameOrigin(
        new Request("http://localhost:3000/api/cart", {
          headers: { host: "store.test@evil.test", origin: "http://evil.test" },
        }),
      ),
    { code: "INVALID_CONFIGURATION" },
  );
});

test("demo cart merges items, persists only IDs and quantities, updates and removes", () => {
  const add = parseCartAction({
    action: "add",
    merchandiseId: product.variants[0].id,
    quantity: 2,
  });
  let cart = mutateDemoCart(emptyCart("demo"), add, [product]);
  cart = mutateDemoCart(cart, add, [product]);
  assert.equal(cart.lines.length, 1);
  assert.equal(cart.totalQuantity, 4);
  assert.equal(cart.subtotal, null);
  assert.equal(cart.lines[0].unitPrice, null);
  const encoded = writeDemoCart(cart);
  assert.deepEqual(readDemoCart(encoded, [product]), cart);
  assert.equal(
    Buffer.from(encoded, "base64url").toString().includes("price"),
    false,
  );
  cart = mutateDemoCart(
    cart,
    { action: "update", lineId: cart.lines[0].id, quantity: 1 },
    [product],
  );
  assert.equal(cart.totalQuantity, 1);
  cart = mutateDemoCart(cart, { action: "remove", lineId: cart.lines[0].id }, [
    product,
  ]);
  assert.equal(cart.totalQuantity, 0);
  assert.deepEqual(cart.lines, []);
});

test("demo cart rejects unavailable or unknown variants, over-limit quantities, and live checkout", () => {
  assert.throws(
    () => mutateDemoCart(emptyCart("demo"), { action: "checkout" }, [product]),
    { code: "DEMO_CHECKOUT_DISABLED" },
  );
  assert.throws(
    () =>
      mutateDemoCart(
        emptyCart("demo"),
        { action: "add", merchandiseId: "unknown", quantity: 1 },
        [product],
      ),
    { code: "PRODUCT_NOT_FOUND" },
  );
  const soldOut = {
    ...product,
    variants: [{ ...product.variants[0], availableForSale: false }],
  };
  assert.throws(
    () =>
      mutateDemoCart(
        emptyCart("demo"),
        { action: "add", merchandiseId: product.variants[0].id, quantity: 1 },
        [soldOut],
      ),
    { code: "SOLD_OUT" },
  );
  const cart = mutateDemoCart(
    emptyCart("demo"),
    { action: "add", merchandiseId: product.variants[0].id, quantity: 99 },
    [product],
  );
  assert.throws(
    () =>
      mutateDemoCart(
        cart,
        { action: "add", merchandiseId: product.variants[0].id, quantity: 1 },
        [product],
      ),
    { code: "QUANTITY_LIMIT" },
  );
  assert.throws(
    () =>
      mutateDemoCart(cart, { action: "remove", lineId: "unknown" }, [product]),
    { code: "LINE_NOT_FOUND" },
  );
});

test("corrupt, duplicate and invalid demo cookie entries cannot fabricate cart content", () => {
  const cookie = (value: unknown) =>
    Buffer.from(JSON.stringify(value)).toString("base64url");
  for (const value of [
    "not-base64",
    cookie({ price: 0 }),
    cookie([[product.variants[0].id, -1]]),
    cookie([
      [product.variants[0].id, 1],
      [product.variants[0].id, 1],
    ]),
  ]) {
    assert.equal(readDemoCart(value, [product]).totalQuantity, 0);
  }
  assert.equal(
    readDemoCart(cookie([["nonexistent-variant", 1]]), [product]).totalQuantity,
    0,
  );
});

test("Shopify products preserve merchant prices and parse public editorial metafields", () => {
  const normalized = normalizeProduct(shopifyProduct);
  assert.equal(normalized.source, "shopify");
  assert.deepEqual(normalized.variants[0].price, {
    amount: "299.00",
    currencyCode: "INR",
  });
  assert.deepEqual(normalized.details?.benefits, ["Merchant approved benefit"]);
  assert.equal(normalized.details?.directions, undefined);
  assert.deepEqual(normalized.details?.featuredIngredients, [
    { name: "Vitamin C", description: "Merchant approved copy" },
  ]);
  assert.equal(normalized.details?.netContent, "20 ml");
  assert.equal(normalized.images[0].altText, "Real mask product image");
  assert.equal(normalized.variants[0].mrp, null);
});

test("Shopify comparison prices become MRP only after merchant verification, with no demo fallback", () => {
  const merchantMrp = { amount: "525.00", currencyCode: "INR" };
  const merchantProduct = {
    ...shopifyProduct,
    variants: {
      nodes: [
        { ...shopifyProduct.variants.nodes[0], compareAtPrice: merchantMrp },
      ],
    },
  };
  assert.equal(normalizeProduct(merchantProduct).variants[0].mrp, null);
  const normalized = normalizeProduct(merchantProduct, true);
  assert.deepEqual(normalized.variants[0].mrp, merchantMrp);
  assert.deepEqual(
    normalized.variants[0].price,
    shopifyProduct.variants.nodes[0].price,
  );
  assert.equal(normalizeProduct(shopifyProduct, true).variants[0].mrp, null);
  const merchantCart = {
    ...shopifyCart,
    lines: {
      nodes: [
        {
          ...shopifyCart.lines.nodes[0],
          merchandise: {
            ...shopifyCart.lines.nodes[0].merchandise,
            compareAtPrice: merchantMrp,
          },
        },
      ],
    },
  };
  assert.equal(normalizeCart(merchantCart).lines[0].unitMrp, null);
  assert.equal(
    normalizeCart(merchantCart, undefined, true).lines[0].unitMrp,
    null,
  );
  assert.deepEqual(
    normalizeCart(merchantCart, undefined, false, true).lines[0].unitMrp,
    merchantMrp,
  );
  assert.equal(
    normalizeCart(shopifyCart, undefined, false, true).lines[0].unitMrp,
    null,
  );
});

test("product fetches and cart operations respect MRP verification independently from checkout", async (t) => {
  for (const checkoutVerified of [false, true]) {
    for (const mrpVerified of [false, true]) {
      await t.test(
        `checkout ${checkoutVerified}, MRP ${mrpVerified}`,
        async (t) => {
          withLiveEnvironment(t, checkoutVerified, mrpVerified);
          const comparisonPrice = { amount: "525.00", currencyCode: "INR" };
          const merchantProduct = {
            ...shopifyProduct,
            variants: {
              nodes: [
                {
                  ...shopifyProduct.variants.nodes[0],
                  compareAtPrice: comparisonPrice,
                },
              ],
            },
          };
          const merchantCart = {
            ...shopifyCart,
            lines: {
              nodes: [
                {
                  ...shopifyCart.lines.nodes[0],
                  merchandise: {
                    ...shopifyCart.lines.nodes[0].merchandise,
                    compareAtPrice: comparisonPrice,
                  },
                },
              ],
            },
          };
          t.mock.method(
            globalThis,
            "fetch",
            async (_url: string, init: RequestInit) => {
              const { query } = JSON.parse(init.body as string);
              if (query.includes("query Products("))
                return Response.json({
                  data: { products: { nodes: [merchantProduct] } },
                });
              if (query.includes("query Product("))
                return Response.json({ data: { product: merchantProduct } });
              if (query.includes("AvailableVariant"))
                return Response.json({
                  data: { node: { id: variantId, availableForSale: true } },
                });
              if (query.includes("cartCreate("))
                return Response.json({
                  data: {
                    cartCreate: {
                      cart: merchantCart,
                      userErrors: [],
                      warnings: [],
                    },
                  },
                });
              return Response.json({ data: { cart: merchantCart } });
            },
          );
          const expectedMrp = mrpVerified ? comparisonPrice : null;
          const product = await getShopifyProduct(shopifyProduct.handle);
          assert.deepEqual(product?.variants[0].mrp, expectedMrp);
          assert.deepEqual(
            (await shopifyProducts())[0].variants[0].mrp,
            expectedMrp,
          );
          const loaded = await getLiveCart(secretId);
          const created = await mutateLiveCart(undefined, {
            action: "add",
            merchandiseId: variantId,
            quantity: 2,
          });
          for (const { cart } of [loaded, created]) {
            assert.deepEqual(cart.lines[0].unitMrp, expectedMrp);
            assert.equal(cart.checkoutEnabled, checkoutVerified);
            assert.equal(cart.lines[0].unitPrice?.amount, "299.00");
          }
        },
      );
    }
  }
});

test("public cart excludes the Shopify secret and stale checkout URL", () => {
  const cart = normalizeCart(shopifyCart, [
    { message: "Quantity was adjusted." },
  ]);
  assert.equal(cart.checkoutUrl, null);
  assert.equal(JSON.stringify(cart).includes("private-cart-secret"), false);
  assert.equal(cart.subtotal?.amount, "598.00");
  assert.deepEqual(cart.warnings, ["Quantity was adjusted."]);
  assert.equal(validCartCookie(secretId), secretId);
  assert.equal(validCartCookie("https://evil.test"), undefined);
});

test("checkout URLs allow only HTTPS on explicitly trusted exact hosts", () => {
  const config = getCommerceConfig(liveEnvironment);
  assert.equal(config.mode, "live");
  if (config.mode !== "live") return;
  assert.equal(
    safeCheckoutUrl(shopifyCart.checkoutUrl, config),
    shopifyCart.checkoutUrl,
  );
  assert.equal(
    safeCheckoutUrl("https://checkout.store.test/a", {
      ...config,
      checkoutDomain: "checkout.store.test",
    }),
    "https://checkout.store.test/a",
  );
  for (const value of [
    "javascript:alert(1)",
    "http://test-store.myshopify.com/a",
    "https://test-store.myshopify.com.evil.test/a",
    "https://evil.myshopify.com/a",
    "https://user:pass@test-store.myshopify.com/a",
    "https://test-store.myshopify.com:8443/a",
  ]) {
    assert.throws(() => safeCheckoutUrl(value, config), {
      code: "INVALID_CHECKOUT_URL",
    });
  }
});

test("Storefront API uses server credentials and hides provider error details", async (t) => {
  withLiveEnvironment(t);
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    assert.equal(
      url,
      "https://test-store.myshopify.com/api/2026-10/graphql.json",
    );
    assert.equal(
      (init.headers as Record<string, string>)[
        "X-Shopify-Storefront-Access-Token"
      ],
      "test-token",
    );
    assert.equal(init.cache, "no-store");
    return Response.json({ errors: [{ message: "sensitive upstream error" }] });
  });
  await assert.rejects(
    storefront("query { shop { name } }"),
    (error: unknown) =>
      error instanceof CommerceError &&
      error.code === "STORE_API_ERROR" &&
      !error.message.includes("sensitive"),
  );
});

test("live product queries follow product and variant pagination", async (t) => {
  withLiveEnvironment(t);
  const calls: string[] = [];
  t.mock.method(
    globalThis,
    "fetch",
    async (_url: string, init: RequestInit) => {
      const body = JSON.parse(init.body as string);
      calls.push(body.query);
      if (body.query.includes("ProductOptions"))
        return Response.json({
          data: {
            product: {
              variants: {
                nodes: [
                  {
                    ...shopifyProduct.variants.nodes[0],
                    id: "gid://shopify/ProductVariant/101",
                  },
                ],
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          },
        });
      if (body.variables.after)
        return Response.json({
          data: {
            products: {
              nodes: [],
              pageInfo: { hasNextPage: false, endCursor: null },
            },
          },
        });
      return Response.json({
        data: {
          products: {
            nodes: [
              {
                ...shopifyProduct,
                variants: {
                  ...shopifyProduct.variants,
                  pageInfo: { hasNextPage: true, endCursor: "v1" },
                },
              },
            ],
            pageInfo: { hasNextPage: true, endCursor: "p1" },
          },
        },
      });
    },
  );
  const products = await shopifyProducts();
  assert.equal(products.length, 1);
  assert.equal(products[0].variants.length, 2);
  assert.equal(calls.length, 3);
});

test("live add creates an India-market cart and keeps the full cart secret server-side", async (t) => {
  withLiveEnvironment(t);
  const mutations: Record<string, unknown>[] = [];
  t.mock.method(
    globalThis,
    "fetch",
    async (_url: string, init: RequestInit) => {
      const body = JSON.parse(init.body as string);
      if (body.query.includes("AvailableVariant"))
        return Response.json({
          data: { node: { id: variantId, availableForSale: true } },
        });
      mutations.push(body.variables);
      return Response.json({
        data: {
          cartCreate: { cart: shopifyCart, userErrors: [], warnings: [] },
        },
      });
    },
  );
  const result = await mutateLiveCart(undefined, {
    action: "add",
    merchandiseId: variantId,
    quantity: 2,
  });
  assert.equal(result.cartId, secretId);
  assert.equal(result.cart.totalQuantity, 2);
  assert.notEqual(result.cart.id, secretId);
  assert.deepEqual(mutations[0], {
    input: {
      lines: [{ merchandiseId: variantId, quantity: 2 }],
      buyerIdentity: { countryCode: "IN" },
    },
  });
});

test("live cart rejects sold-out additions before creating a cart", async (t) => {
  withLiveEnvironment(t);
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json({
      data: { node: { id: variantId, availableForSale: false } },
    });
  });
  await assert.rejects(
    mutateLiveCart(undefined, {
      action: "add",
      merchandiseId: variantId,
      quantity: 1,
    }),
    { code: "SOLD_OUT" },
  );
  assert.equal(calls, 1);
});

test("live checkout refreshes the cart and expired carts return an empty bag", async (t) => {
  withLiveEnvironment(t, true);
  let missing = false;
  t.mock.method(
    globalThis,
    "fetch",
    async (_url: string, init: RequestInit) => {
      assert.deepEqual(JSON.parse(init.body as string).variables, {
        id: secretId,
      });
      return Response.json({ data: { cart: missing ? null : shopifyCart } });
    },
  );
  assert.equal(await liveCheckout(secretId), shopifyCart.checkoutUrl);
  missing = true;
  assert.deepEqual(await getLiveCart(secretId), {
    cart: emptyCart("live", true),
  });
  await assert.rejects(liveCheckout(secretId), { code: "EMPTY_CART" });
});

test("unverified live checkout fails before requesting Shopify or revealing a URL", async (t) => {
  withLiveEnvironment(t);
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json({ data: { cart: shopifyCart } });
  });
  await assert.rejects(liveCheckout(secretId), {
    code: "CHECKOUT_NOT_VERIFIED",
    status: 409,
  });
  assert.equal(calls, 0);
  const { cart } = await getLiveCart(secretId);
  assert.equal(cart.checkoutEnabled, false);
  assert.equal(cart.checkoutUrl, null);
});

test("all five pack quantities pass unchanged to Shopify create, add and update mutations", async (t) => {
  withLiveEnvironment(t);
  for (const quantity of [1, 3, 6, 9, 12]) {
    await t.test(`pack of ${quantity}`, async (t) => {
      const mutations: { field: string; variables: Record<string, unknown> }[] =
        [];
      t.mock.method(
        globalThis,
        "fetch",
        async (_url: string, init: RequestInit) => {
          const { query, variables } = JSON.parse(init.body as string);
          if (query.includes("AvailableVariant"))
            return Response.json({
              data: { node: { id: variantId, availableForSale: true } },
            });
          if (query.includes("query Cart("))
            return Response.json({ data: { cart: shopifyCart } });
          const field = query.includes("cartCreate(")
            ? "cartCreate"
            : query.includes("cartLinesAdd(")
              ? "cartLinesAdd"
              : "cartLinesUpdate";
          mutations.push({ field, variables });
          const actualQuantity =
            field === "cartLinesAdd" ? quantity + 2 : quantity;
          const cart = {
            ...shopifyCart,
            totalQuantity: actualQuantity,
            cost: {
              subtotalAmount: {
                amount: (actualQuantity * 299).toFixed(2),
                currencyCode: "INR",
              },
            },
            lines: {
              nodes: [
                { ...shopifyCart.lines.nodes[0], quantity: actualQuantity },
              ],
            },
          };
          return Response.json({
            data: { [field]: { cart, userErrors: [], warnings: [] } },
          });
        },
      );
      const created = await mutateLiveCart(undefined, {
        action: "add",
        merchandiseId: variantId,
        quantity,
      });
      const added = await mutateLiveCart(secretId, {
        action: "add",
        merchandiseId: variantId,
        quantity,
      });
      const updated = await mutateLiveCart(secretId, {
        action: "update",
        lineId: shopifyCart.lines.nodes[0].id,
        quantity,
      });
      assert.deepEqual(mutations, [
        {
          field: "cartCreate",
          variables: {
            input: {
              lines: [{ merchandiseId: variantId, quantity }],
              buyerIdentity: { countryCode: "IN" },
            },
          },
        },
        {
          field: "cartLinesAdd",
          variables: {
            cartId: secretId,
            lines: [{ merchandiseId: variantId, quantity }],
          },
        },
        {
          field: "cartLinesUpdate",
          variables: {
            cartId: secretId,
            lines: [{ id: shopifyCart.lines.nodes[0].id, quantity }],
          },
        },
      ]);
      assert.equal(created.cart.totalQuantity, quantity);
      assert.equal(added.cart.totalQuantity, quantity + 2);
      assert.equal(updated.cart.lines[0].quantity, quantity);
      assert.equal(updated.cart.lines[0].unitPrice?.amount, "299.00");
      assert.equal(updated.cart.subtotal?.amount, (quantity * 299).toFixed(2));
      assert.equal(updated.cart.checkoutEnabled, false);
    });
  }
});

test("cart costs preserve Shopify's contextual zero unit price and exact subtotal", () => {
  const contextual = {
    ...shopifyCart,
    cost: { subtotalAmount: { amount: "0.00", currencyCode: "INR" } },
    lines: {
      nodes: shopifyCart.lines.nodes.map((line) => ({
        ...line,
        cost: { amountPerQuantity: { amount: "0.00", currencyCode: "INR" } },
      })),
    },
  };
  const cart = normalizeCart(contextual);
  assert.deepEqual(cart.subtotal, contextual.cost.subtotalAmount);
  assert.deepEqual(cart.lines[0].unitPrice, {
    amount: "0.00",
    currencyCode: "INR",
  });
  const freeProduct = normalizeProduct({
    ...shopifyProduct,
    variants: {
      nodes: [
        {
          ...shopifyProduct.variants.nodes[0],
          price: { amount: "0.00", currencyCode: "INR" },
        },
      ],
    },
  });
  assert.equal(freeProduct.variants[0].price?.amount, "0.00");
});

function apiEnvironment(t: TestContext, mode: "demo" | "live") {
  const previousMode = process.env.STOREFRONT_MODE;
  const previousSite = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.STOREFRONT_MODE = mode;
  process.env.NEXT_PUBLIC_SITE_URL = "https://store.test";
  t.after(() => {
    if (previousMode !== mode) {
      if (previousMode === undefined) delete process.env.STOREFRONT_MODE;
      else process.env.STOREFRONT_MODE = previousMode;
    }
    if (previousSite === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previousSite;
  });
}

function apiRequest(body: unknown, cookie?: string) {
  return new NextRequest("https://store.test/api/cart", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      origin: "https://store.test",
      "content-type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
  });
}

test("cart API blocks unverified live checkout even when called directly", async (t) => {
  withLiveEnvironment(t);
  apiEnvironment(t, "live");
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json({ data: { cart: shopifyCart } });
  });
  const cookie = `skinkari_cart=${encodeURIComponent(secretId)}`;
  const response = await POST(apiRequest({ action: "checkout" }, cookie));
  assert.equal(response.status, 409);
  const body = await response.json();
  assert.equal(body.code, "CHECKOUT_NOT_VERIFIED");
  assert.equal(body.checkoutUrl, undefined);
  assert.equal(response.cookies.get("skinkari_cart"), undefined);
  assert.equal(calls, 0);
  const loaded = await GET(
    new NextRequest("https://store.test/api/cart", { headers: { cookie } }),
  );
  assert.equal((await loaded.json()).checkoutEnabled, false);
});

test("verified live carts expose checkout permission while retaining fresh URL retrieval", async (t) => {
  withLiveEnvironment(t, true);
  apiEnvironment(t, "live");
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({ data: { cart: shopifyCart } }),
  );
  const cookie = `skinkari_cart=${encodeURIComponent(secretId)}`;
  const loaded = await GET(
    new NextRequest("https://store.test/api/cart", { headers: { cookie } }),
  );
  const cart = await loaded.json();
  assert.equal(cart.checkoutEnabled, true);
  assert.equal(cart.checkoutUrl, null);
  const response = await POST(apiRequest({ action: "checkout" }, cookie));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    checkoutUrl: shopifyCart.checkoutUrl,
  });
});

test("cart route persists HttpOnly demo state across GET, update and removal, and blocks checkout", async (t) => {
  apiEnvironment(t, "demo");
  const merchandiseId = getDemoProducts()[0].variants[0].id;
  const added = await POST(
    apiRequest({ action: "add", merchandiseId, quantity: 2 }),
  );
  assert.equal(added.status, 200);
  assert.match(added.headers.get("set-cookie") || "", /HttpOnly/);
  assert.match(added.headers.get("set-cookie") || "", /SameSite=lax/);
  assert.match(added.headers.get("cache-control") || "", /no-store/);
  let cookie = `skinkari_demo_cart=${added.cookies.get("skinkari_demo_cart")!.value}`;
  const loaded = await GET(
    new NextRequest("https://store.test/api/cart", { headers: { cookie } }),
  );
  const cart = await loaded.json();
  assert.equal(cart.totalQuantity, 2);
  assert.equal(cart.subtotal, null);
  const updated = await POST(
    apiRequest(
      { action: "update", lineId: cart.lines[0].id, quantity: 3 },
      cookie,
    ),
  );
  assert.equal((await updated.json()).totalQuantity, 3);
  cookie = `skinkari_demo_cart=${updated.cookies.get("skinkari_demo_cart")!.value}`;
  const checkout = await POST(apiRequest({ action: "checkout" }, cookie));
  assert.equal(checkout.status, 409);
  assert.equal((await checkout.json()).code, "DEMO_CHECKOUT_DISABLED");
  const removed = await POST(
    apiRequest({ action: "remove", lineId: cart.lines[0].id }, cookie),
  );
  assert.equal((await removed.json()).totalQuantity, 0);
});

test("cart route rejects cross-origin, malformed, oversized and invalid requests without writing state", async (t) => {
  apiEnvironment(t, "demo");
  const requests = [
    [
      new NextRequest("https://store.test/api/cart", {
        method: "POST",
        headers: {
          origin: "https://evil.test",
          "content-type": "application/json",
        },
        body: '{"action":"checkout"}',
      }),
      403,
    ],
    [
      new NextRequest("https://store.test/api/cart", {
        method: "POST",
        headers: { origin: "https://store.test", "content-type": "text/plain" },
        body: "hello",
      }),
      415,
    ],
    [
      new NextRequest("https://store.test/api/cart", {
        method: "POST",
        headers: {
          origin: "https://store.test",
          "content-type": "application/json",
        },
        body: "{",
      }),
      400,
    ],
    [
      new NextRequest("https://store.test/api/cart", {
        method: "POST",
        headers: {
          origin: "https://store.test",
          "content-type": "application/json",
        },
        body: " ".repeat(4097),
      }),
      413,
    ],
    [
      apiRequest({
        action: "add",
        merchandiseId: "demo:test-mask:default",
        quantity: 0,
      }),
      400,
    ],
  ] as const;
  for (const [request, status] of requests) {
    const response = await POST(request);
    assert.equal(response.status, status);
    assert.equal(response.headers.get("set-cookie"), null);
    assert.equal(typeof (await response.json()).error, "string");
  }
});

test("expired live carts clear the cookie and replacement carts explain lost contents", async (t) => {
  withLiveEnvironment(t);
  apiEnvironment(t, "live");
  t.mock.method(
    globalThis,
    "fetch",
    async (_url: string, init: RequestInit) => {
      const { query } = JSON.parse(init.body as string);
      if (query.includes("AvailableVariant"))
        return Response.json({
          data: { node: { id: variantId, availableForSale: true } },
        });
      if (query.includes("cartCreate"))
        return Response.json({
          data: {
            cartCreate: { cart: shopifyCart, userErrors: [], warnings: [] },
          },
        });
      return Response.json({ data: { cart: null } });
    },
  );
  const cookie = `skinkari_cart=${encodeURIComponent(secretId)}`;
  const updated = await POST(
    apiRequest(
      { action: "update", lineId: shopifyCart.lines.nodes[0].id, quantity: 3 },
      cookie,
    ),
  );
  assert.equal(updated.status, 409);
  assert.equal((await updated.json()).code, "CART_EXPIRED");
  assert.equal(updated.cookies.get("skinkari_cart")?.value, "");
  const replacement = await POST(
    apiRequest(
      { action: "add", merchandiseId: variantId, quantity: 2 },
      cookie,
    ),
  );
  assert.equal(replacement.status, 200);
  const cart = await replacement.json();
  assert.match(cart.warnings[0], /previous bag expired/);
  assert.equal(JSON.stringify(cart).includes("private-cart-secret"), false);
});

test("a provider cart beyond the pagination boundary fails before any mutation", async (t) => {
  withLiveEnvironment(t);
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json({
      data: {
        cart: {
          ...shopifyCart,
          lines: {
            ...shopifyCart.lines,
            pageInfo: { hasNextPage: true, endCursor: "more" },
          },
        },
      },
    });
  });
  await assert.rejects(
    mutateLiveCart(secretId, {
      action: "add",
      merchandiseId: variantId,
      quantity: 1,
    }),
    { code: "CART_LIMIT" },
  );
  assert.equal(calls, 1);
});
