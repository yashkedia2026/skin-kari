import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import test from "node:test";
import { products } from "../src/data/products";
import {
  getDemoProducts,
  mutateDemoCart,
  readDemoCart,
} from "../src/lib/commerce/demo";

test("the four approved product PDFs are represented in the catalogue", () => {
  const sources = readdirSync(
    new URL("../reference/products/", import.meta.url),
  )
    .filter((file) => file.endsWith(".pdf") && file !== "BRIGHTENING MASK.pdf")
    .sort();
  assert.deepEqual(
    products.map((product) => product.packaging.source).sort(),
    sources,
  );
  assert.equal(
    new Set(products.map((product) => product.handle)).size,
    products.length,
  );
  assert.equal(products.length, 4);
});

test("the removed mask is dropped from saved bags and cannot be added again", () => {
  const catalogue = getDemoProducts();
  const removedVariant = "demo:brightening-mask:default";
  const retainedVariant = catalogue[0].variants[0].id;
  const cookie = Buffer.from(
    JSON.stringify([
      [removedVariant, 1],
      [retainedVariant, 2],
    ]),
  ).toString("base64url");
  const cart = readDemoCart(cookie, catalogue);
  assert.equal(cart.lines.length, 1);
  assert.equal(cart.lines[0].merchandiseId, retainedVariant);
  assert.equal(cart.totalQuantity, 2);
  assert.throws(
    () =>
      mutateDemoCart(
        cart,
        { action: "add", merchandiseId: removedVariant, quantity: 1 },
        catalogue,
      ),
    { code: "PRODUCT_NOT_FOUND", status: 404 },
  );
});
