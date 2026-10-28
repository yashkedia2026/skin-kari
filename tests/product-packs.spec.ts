import { mkdir } from "node:fs/promises";
import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const productPath = "/products/vitamin-c-radiance-face-mask";
const variantId = "demo:vitamin-c-radiance-face-mask:default";
const quantities = [1, 3, 6, 9, 12] as const;
const packLabel = (quantity: number) =>
  quantity === 1 ? "Single Mask (1)" : `Pack of ${quantity}`;
const mrpPattern = (quantity: number) =>
  new RegExp(`₹${(499 * quantity).toLocaleString("en-IN")}(?:\\.00)?`);

async function readyDemo(page: Page, path = productPath) {
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  // Never mutate a merchant storefront accidentally when running this suite.
  await expect(
    page.getByText("DEMO STORE · CHECKOUT DISABLED", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function assertPackPreview(page: Page, quantity: number) {
  const preview = page.getByRole("figure", { name: "Selected pack preview" });
  await expect(preview).toHaveAttribute("data-quantity", String(quantity));
  await expect(preview).toHaveAttribute("data-stacked", String(quantity > 1));
  await expect(preview).toContainText(
    quantity === 1 ? "Single Mask" : `Pack of ${quantity}`,
  );
  await expect(preview).toContainText(
    `${quantity} individual sheet ${quantity === 1 ? "mask" : "masks"}`,
  );
  // Duplicate artwork conveys a stack visually without repeating its alt text.
  await expect(preview.getByRole("img")).toHaveCount(1);
  const images = preview.locator("img");
  if (quantity === 1) {
    await expect(images).toHaveCount(1);
  } else {
    const count = await images.count();
    expect(count).toBeGreaterThan(1);
    expect(count).toBeLessThanOrEqual(3);
    await expect(
      preview.locator('img[alt=""][aria-hidden="true"]'),
    ).toHaveCount(count - 1);
  }
  const sources = await images.evaluateAll((elements) =>
    elements.map((image) => {
      const url = new URL((image as HTMLImageElement).src);
      return url.searchParams.get("url") || url.pathname;
    }),
  );
  expect(new Set(sources).size).toBe(1);
  return preview;
}

for (const quantity of quantities) {
  test(`${packLabel(quantity)} calculates provisional MRP and persists the exact mask quantity`, async ({
    page,
  }) => {
    await readyDemo(page);
    const selector = page.getByRole("group", { name: "Choose your pack" });
    await expect(selector.getByRole("radio")).toHaveCount(5);
    const choice = selector.getByRole("radio", {
      name: packLabel(quantity),
      exact: true,
    });
    await choice.check();
    await expect(choice).toBeChecked();
    await expect(selector.locator('input[type="radio"]:checked')).toHaveCount(
      1,
    );
    const pricing = page.getByLabel("Pack pricing");
    await expect(pricing).toContainText(mrpPattern(quantity));
    await expect(
      pricing.getByText(new RegExp(`^${quantity} sheet masks?\\b`)),
    ).toBeVisible();
    await expect(pricing).toContainText(/provisional/i);
    await assertPackPreview(page, quantity);

    const addedRequest = page.waitForRequest(
      (request) =>
        new URL(request.url()).pathname === "/api/cart" &&
        request.method() === "POST",
    );
    await page
      .getByRole("button", { name: "Add to demo bag", exact: true })
      .click();
    expect((await addedRequest).postDataJSON()).toEqual({
      action: "add",
      merchandiseId: variantId,
      quantity,
    });

    const drawer = page.getByRole("dialog", { name: "Your good-skin bag." });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByLabel("Quantity", { exact: true })).toHaveText(
      String(quantity),
    );
    await expect(
      drawer.getByRole("button", { name: "Checkout unavailable in demo" }),
    ).toBeDisabled();
    await expect(
      drawer.getByText("Not priced yet", { exact: true }),
    ).toBeVisible();
    const cart = await (await page.request.get("/api/cart")).json();
    expect(cart.totalQuantity).toBe(quantity);
    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0].merchandiseId).toBe(variantId);
    expect(cart.lines[0].quantity).toBe(quantity);
    expect(cart.lines[0].unitPrice).toBeNull();
    expect(cart.subtotal).toBeNull();
    expect(cart.checkoutEnabled).toBe(false);

    await page.reload();
    await page
      .getByRole("button", {
        name: `Open shopping bag, ${quantity} items`,
        exact: true,
      })
      .click();
    await expect(drawer.getByLabel("Quantity", { exact: true })).toHaveText(
      String(quantity),
    );
  });
}

test("pack selection supports keyboard navigation and updates its announced pricing", async ({
  page,
}) => {
  await readyDemo(page);
  const first = page.getByRole("radio", {
    name: "Single Mask (1)",
    exact: true,
  });
  await first.focus();
  await expect(first).toBeFocused();
  for (const quantity of [3, 6, 9, 12]) {
    await page.keyboard.press("ArrowRight");
    const current = page.getByRole("radio", {
      name: packLabel(quantity),
      exact: true,
    });
    await expect(current).toBeFocused();
    await expect(current).toBeChecked();
    await expect(page.getByLabel("Pack pricing")).toContainText(
      mrpPattern(quantity),
    );
  }
  await page.keyboard.press("ArrowRight");
  await expect(first).toBeChecked();
  await expect(page.getByLabel("Pack pricing")).toHaveAttribute(
    "aria-live",
    "polite",
  );
});

test("pack imagery follows every selection, respects reduced motion and returns to one packet", async ({
  page,
}, testInfo) => {
  await readyDemo(page);
  const preview = await assertPackPreview(page, 1);
  const originalImage = await preview.getByRole("img").getAttribute("alt");
  await preview
    .getByRole("img")
    .evaluate((image) => (image as HTMLImageElement).decode());
  await mkdir("docs/previews/packs", { recursive: true });
  await preview.screenshot({
    path: `docs/previews/packs/${testInfo.project.name}-vitamin-c-radiance-face-mask-single-image.png`,
    style: "nextjs-portal { visibility: hidden; }",
  });
  for (const quantity of [3, 6, 9, 12]) {
    await page
      .getByRole("radio", { name: packLabel(quantity), exact: true })
      .check();
    await assertPackPreview(page, quantity);
    await expect(preview.getByRole("img")).toHaveAttribute(
      "alt",
      originalImage!,
    );
    await expect(page.getByLabel("Pack pricing")).toContainText(
      mrpPattern(quantity),
    );
  }
  const motionDurations = await preview.evaluate((figure) =>
    [figure, ...figure.querySelectorAll("*")].flatMap((element) => {
      const style = getComputedStyle(element);
      return [style.transitionDuration, style.animationDuration]
        .flatMap((durations) => durations.split(","))
        .map((duration) => parseFloat(duration));
    }),
  );
  // The existing global reduced-motion rule uses a near-zero 0.01ms duration.
  expect(motionDurations.every((duration) => duration <= 0.00001)).toBe(true);
  await preview.screenshot({
    path: `docs/previews/packs/${testInfo.project.name}-vitamin-c-radiance-face-mask-pack12-image.png`,
    style: "nextjs-portal { visibility: hidden; }",
  });
  await page
    .getByRole("radio", { name: "Single Mask (1)", exact: true })
    .check();
  await assertPackPreview(page, 1);
  await expect(page.getByLabel("Pack pricing")).toContainText(mrpPattern(1));
});

const products = [
  ["detan-face-mask", "green", "#00744f"],
  ["vitamin-c-radiance-face-mask", "orange", "#ffb022"],
  ["hyaluronic-acid-face-mask", "blue", "#0785ef"],
  ["collagen-peptide-face-mask", "pink", "#ea338a"],
] as const;

for (const [handle, tone, brandColor] of products) {
  test(`${handle} retains its branding and hides unprovided testimonials`, async ({
    page,
  }, testInfo) => {
    const mediaRequests: string[] = [];
    page.on("request", (request) => {
      if (
        request.resourceType() === "media" ||
        /\.(mp4|webm|ogv|vtt)(?:\?|$)/i.test(request.url())
      )
        mediaRequests.push(request.url());
    });
    await readyDemo(page, `/products/${handle}`);
    await expect(page.locator(`.product-detail.tone-${tone}`)).toBeVisible();
    const selector = page.getByRole("group", { name: "Choose your pack" });
    expect(
      await selector.evaluate((element) =>
        getComputedStyle(element).getPropertyValue("--tone-bg").trim(),
      ),
    ).toBe(brandColor);
    await selector
      .getByRole("radio", { name: "Pack of 6", exact: true })
      .check();
    await expect(page.getByLabel("Pack pricing")).toContainText(mrpPattern(6));
    const preview = await assertPackPreview(page, 6);
    const source = await preview.getByRole("img").evaluate((image) => {
      const url = new URL((image as HTMLImageElement).src);
      return url.searchParams.get("url") || url.pathname;
    });
    const expectedArtwork = {
      "detan-face-mask": "/images/products/detan.webp",
      "vitamin-c-radiance-face-mask": "/images/products/vitamin-c.webp",
      "hyaluronic-acid-face-mask": "/images/products/hyaluronic-acid.webp",
      "collagen-peptide-face-mask": "/images/products/collagen-peptide.webp",
    };
    expect(source).toBe(expectedArtwork[handle]);
    await expect(page.locator("video")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: /video testimonials/i }),
    ).toHaveCount(0);
    const productJson = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const productSchema = productJson
      .map((text) => JSON.parse(text))
      .find((value) => value["@type"] === "Product");
    expect(productSchema).toBeTruthy();
    expect(productSchema).not.toHaveProperty("offers");
    expect(productSchema).not.toHaveProperty("review");
    expect(productSchema).not.toHaveProperty("aggregateRating");
    expect(mediaRequests).toEqual([]);

    const accessibility = await new AxeBuilder({ page })
      .include(".purchase-box")
      .include('[aria-label="Selected pack preview"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    // Capture the whole page with loaded artwork and the sticky header at top.
    // Focus/scroll left by selection and axe must not distort saved previews.
    await page.locator("img").evaluateAll(async (images) => {
      await Promise.all(
        images.map(async (image) => {
          if (!(image instanceof HTMLImageElement)) return;
          image.loading = "eager";
          await image.decode();
        }),
      );
    });
    await page.evaluate(() => {
      (document.activeElement as HTMLElement | null)?.blur();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await mkdir("docs/previews/packs", { recursive: true });
    await page.screenshot({
      path: `docs/previews/packs/${testInfo.project.name}-${handle}.png`,
      fullPage: true,
      style: "nextjs-portal { visibility: hidden; }",
    });
    await page.locator(".purchase-box").screenshot({
      path: `docs/previews/packs/${testInfo.project.name}-${handle}-selector.png`,
      style: "nextjs-portal { visibility: hidden; }",
    });
    await preview.screenshot({
      path: `docs/previews/packs/${testInfo.project.name}-${handle}-image.png`,
      style: "nextjs-portal { visibility: hidden; }",
    });
  });
}

test("pack choices remain reachable at phone and tablet widths", async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await readyDemo(page);
    const selector = page.getByRole("group", { name: "Choose your pack" });
    await selector.scrollIntoViewIfNeeded();
    for (const quantity of quantities) {
      const choice = selector.getByRole("radio", {
        name: packLabel(quantity),
        exact: true,
      });
      await choice.check();
      await expect(choice).toBeChecked();
      await expect(page.getByLabel("Pack pricing")).toContainText(
        mrpPattern(quantity),
      );
      await assertPackPreview(page, quantity);
    }
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(
      dimensions.document,
      `Document overflow at ${width}px`,
    ).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(dimensions.body, `Body overflow at ${width}px`).toBeLessThanOrEqual(
      dimensions.viewport + 1,
    );
    const clippedLabels = await selector.locator("label").evaluateAll(
      (labels) =>
        labels.filter((label) => {
          const bounds = label.getBoundingClientRect();
          return bounds.left < 0 || bounds.right > window.innerWidth;
        }).length,
    );
    expect(clippedLabels, `Clipped pack labels at ${width}px`).toBe(0);
  }
});
