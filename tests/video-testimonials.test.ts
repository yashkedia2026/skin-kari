import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { products } from "../src/data/products";
import {
  demoSkincareVideos,
  getDemoSkincareVideos,
} from "../src/data/demo-videos";
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

test("demo skincare clips are local preview assets, separate from customer testimonials", () => {
  assert.equal(demoSkincareVideos.length, 3);
  assert.equal(new Set(demoSkincareVideos.map((video) => video.id)).size, 3);
  for (const video of demoSkincareVideos) {
    assert.match(video.src, /^\/videos\/demo\/.+\.mp4$/);
    assert.match(video.poster, /^\/images\/videos\/demo\/.+\.(?:webp|jpg)$/);
    assert.equal(
      existsSync(new URL(`../public${video.src}`, import.meta.url)),
      true,
    );
    assert.equal(
      existsSync(new URL(`../public${video.poster}`, import.meta.url)),
      true,
    );
    assert.equal("customerName" in video, false);
    assert.equal("approved" in video, false);
  }
});

test("preview footage is available only in demo mode and never supplied to Shopify product pages", () => {
  assert.deepEqual(getDemoSkincareVideos("demo"), demoSkincareVideos);
  assert.deepEqual(getDemoSkincareVideos("shopify"), []);
});
