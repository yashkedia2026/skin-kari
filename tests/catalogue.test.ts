import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import test from "node:test";
import { products } from "../src/data/products";
import {
  getDemoProducts,
  mutateDemoCart,
  readDemoCart,
} from "../src/lib/commerce/demo";

test("every supplied product PDF is represented in the catalogue", () => {
  const sources = readdirSync(
    new URL("../reference/products/", import.meta.url),
  )
    .filter((file) => file.endsWith(".pdf"))
    .sort();
  assert.deepEqual(
    products.map((product) => product.packaging.source).sort(),
    sources,
  );
  assert.equal(
    new Set(products.map((product) => product.handle)).size,
    products.length,
  );
});

test("Brightening Mask stays distinct and does not inherit unsupported directions or prices", () => {
  const editorial = products.find(
    (product) => product.handle === "brightening-mask",
  );
  assert.ok(editorial);
  assert.equal(editorial.packaging.material, "Bio-cellulose");
  assert.deepEqual(editorial.directions, []);
  assert.deepEqual(editorial.caution, []);
  const catalogue = getDemoProducts();
  const product = catalogue.find(
    (product) => product.handle === editorial.handle,
  );
  assert.ok(product);
  const cart = mutateDemoCart(
    readDemoCart(undefined, catalogue),
    { action: "add", merchandiseId: product.variants[0].id, quantity: 1 },
    catalogue,
  );
  assert.equal(cart.lines[0].productHandle, "brightening-mask");
  assert.equal(cart.lines[0].unitPrice, null);
  assert.equal(cart.subtotal, null);
});
