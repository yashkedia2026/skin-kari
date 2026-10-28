import assert from "node:assert/strict";
import test from "node:test";
import { products } from "../src/data/products";
import {
  getProductTestimonials,
  productTestimonials,
} from "../src/data/video-testimonials";

test("no customer testimonials are published before authentic videos arrive", () => {
  assert.deepEqual(productTestimonials, {});
  for (const product of products)
    assert.deepEqual(getProductTestimonials(product.handle), []);
  assert.deepEqual(getProductTestimonials("unknown-product"), []);
});
