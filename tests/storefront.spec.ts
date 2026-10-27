import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const vitaminC = "Vitamin C Radiance Face Mask";
const productPath = "/products/vitamin-c-radiance-face-mask";

async function ready(page: Page, route: string) {
  const response = await page.goto(route);
  await expect(page.getByRole("main")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  return response;
}

async function assertDemo(page: Page) {
  // This suite is deliberately restricted to the local fixture storefront.
  // It must fail before any mutation if pointed at a live merchant storefront.
  await expect(
    page.getByText("DEMO STORE · CHECKOUT DISABLED", { exact: true }),
  ).toBeVisible();
}

async function assertAccessible(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const failures = result.violations.map((violation) => ({
    rule: violation.id,
    nodes: violation.nodes.map((node) => ({
      target: node.target,
      reason: node.failureSummary,
    })),
  }));
  expect
    .soft(failures, `Accessibility violations on ${page.url()}`)
    .toEqual([]);
}

test("discovery leads to four masks and the concern filter narrows the catalogue", async ({
  page,
}) => {
  await ready(page, "/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "SAME SKIN.",
  );
  await page.getByRole("link", { name: "Find your good-skin moment" }).click();
  await expect(page).toHaveURL(/\/shop$/);
  const catalogue = page.getByRole("main");
  await expect(catalogue.getByRole("article")).toHaveCount(4);
  const filters = page.getByRole("navigation", {
    name: "Filter by skin concern",
  });
  await filters.getByRole("link", { name: "Dryness", exact: true }).click();
  await expect(page).toHaveURL(/concern=Dryness/);
  await expect(catalogue.getByRole("article")).toHaveCount(1);
  await expect(
    catalogue.getByRole("heading", { name: "Hyaluronic Acid Face Mask" }),
  ).toBeVisible();
  await expect(filters.getByRole("link", { name: "Dryness" })).toHaveAttribute(
    "aria-current",
    "true",
  );
  await filters.getByRole("link", { name: "All masks", exact: true }).click();
  await expect(catalogue.getByRole("article")).toHaveCount(4);
  await catalogue.getByRole("link", { name: vitaminC, exact: true }).click();
  await expect(page).toHaveURL(productPath);
  await expect(
    page.getByRole("heading", { level: 1, name: vitaminC }),
  ).toBeVisible();
  await page.getByText("Your 15-minute ritual", { exact: true }).click();
  await expect(
    page.getByText("Keep it on for 15 minutes before removing gently.", {
      exact: true,
    }),
  ).toBeVisible();
});

test("demo bag adds, updates, persists and removes items without enabling checkout", async ({
  page,
}) => {
  await ready(page, productPath);
  await assertDemo(page);
  await expect(
    page.getByRole("button", { name: "Decrease quantity", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Increase quantity", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  const drawer = page.getByRole("dialog", { name: "Your good-skin bag." });
  await expect(drawer).toBeVisible();
  await expect(
    drawer.getByRole("link", { name: vitaminC, exact: true }),
  ).toBeVisible();
  await expect(drawer.getByLabel("Quantity", { exact: true })).toHaveText("2");
  await expect(
    drawer.getByRole("button", { name: "Checkout unavailable in demo" }),
  ).toBeDisabled();
  await expect(
    drawer.getByText("Not priced yet", { exact: true }),
  ).toBeVisible();
  await drawer
    .getByRole("button", { name: `Increase ${vitaminC} quantity` })
    .click();
  await expect(drawer.getByLabel("Quantity", { exact: true })).toHaveText("3");
  await drawer
    .getByRole("button", { name: `Decrease ${vitaminC} quantity` })
    .click();
  await expect(drawer.getByLabel("Quantity", { exact: true })).toHaveText("2");
  await page.reload();
  await page
    .getByRole("button", { name: "Open shopping bag, 2 items" })
    .click();
  await expect(drawer.getByLabel("Quantity", { exact: true })).toHaveText("2");
  await drawer.getByRole("link", { name: "View full bag" }).click();
  await expect(page).toHaveURL("/cart");
  const main = page.getByRole("main");
  await expect(main.getByLabel("Quantity", { exact: true })).toHaveText("2");
  await expect(
    main.getByRole("button", { name: "Checkout unavailable in demo" }),
  ).toBeDisabled();
  await main.getByRole("button", { name: `Remove ${vitaminC}` }).click();
  await expect(
    main.getByRole("heading", { name: "A brighter day starts here." }),
  ).toBeVisible();
  await page.reload();
  await expect(
    main.getByRole("heading", { name: "A brighter day starts here." }),
  ).toBeVisible();

  // Also exercise the catalogue card's purchase control, not only the PDP.
  await main.getByRole("link", { name: "Meet the masks" }).click();
  await page
    .getByRole("article")
    .filter({ has: page.getByRole("heading", { name: vitaminC, exact: true }) })
    .getByRole("button", { name: "Try in demo bag" })
    .click();
  await expect(drawer).toBeVisible();
  await expect(drawer.getByLabel("Quantity", { exact: true })).toHaveText("1");
});

test("a rejected purchase exposes the server error without creating a bag item", async ({
  page,
}) => {
  await ready(page, productPath);
  await assertDemo(page);
  await page.route("**/api/cart", async (route) => {
    if (route.request().method() !== "POST") return route.continue();
    await route.fulfill({
      status: 409,
      contentType: "application/json",
      body: JSON.stringify({
        error: "That option is currently unavailable.",
        code: "SOLD_OUT",
      }),
    });
  });
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await expect(page.getByRole("main").getByRole("alert")).toContainText(
    "That option is currently unavailable.",
  );
  await expect(
    page.getByRole("dialog", { name: "Your good-skin bag." }),
  ).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open shopping bag, 0 items" }),
  ).toBeVisible();
});

test("mobile navigation opens, routes and closes accessibly", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "The drawer navigation is intentionally mobile-only.");
  await ready(page, "/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const navigation = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(navigation).toBeVisible();
  await navigation
    .getByRole("link", { name: "Ingredients", exact: true })
    .click();
  await expect(page).toHaveURL("/ingredients");
  await expect(navigation).not.toBeVisible();
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await navigation
    .getByRole("button", { name: "Close navigation menu" })
    .click();
  await expect(navigation).not.toBeVisible();
});

test("unknown products return a real 404 and a recovery link", async ({
  page,
}) => {
  const response = await ready(page, "/products/this-mask-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "This page took",
  );
  await page.getByRole("link", { name: "Explore the masks" }).click();
  await expect(page).toHaveURL("/shop");
});

test("home, shop and product layouts stay within the viewport", async ({
  page,
}, testInfo) => {
  for (const [name, route] of [
    ["home", "/"],
    ["shop", "/shop"],
    ["product", productPath],
  ]) {
    await ready(page, route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(
      dimensions.document,
      `${name} document horizontal overflow`,
    ).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(
      dimensions.body,
      `${name} body horizontal overflow`,
    ).toBeLessThanOrEqual(dimensions.viewport + 1);
    await expect(page.locator("img").first()).toBeVisible();
    await page.screenshot({
      path: testInfo.outputPath(`${name}-viewport.png`),
    });
    await page.screenshot({
      path: testInfo.outputPath(`${name}.png`),
      fullPage: true,
    });
  }
});

test("homepage, product and open bag pass automated accessibility checks", async ({
  page,
}) => {
  await ready(page, "/");
  await assertAccessible(page);
  await ready(page, productPath);
  await assertAccessible(page);
  await assertDemo(page);
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Your good-skin bag." }),
  ).toBeVisible();
  await assertAccessible(page);
});

test("the bag supports Escape and restores keyboard focus", async ({
  page,
}) => {
  await ready(page, "/");
  const trigger = page.getByRole("button", {
    name: "Open shopping bag, 0 items",
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const drawer = page.getByRole("dialog", { name: "Your good-skin bag." });
  await expect(drawer).toBeVisible();
  await expect(
    drawer.getByRole("button", { name: "Close shopping bag" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("product content remains readable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto(productPath);
  await expect(
    page.getByRole("heading", { name: vitaminC, level: 1 }),
  ).toBeVisible();
  await expect(
    page
      .getByText("Vitamin C · Niacinamide · Licorice extract", { exact: true })
      .first(),
  ).toBeVisible();
  await page.getByText("Your 15-minute ritual", { exact: true }).click();
  await expect(
    page.getByText("Keep it on for 15 minutes before removing gently.", {
      exact: true,
    }),
  ).toBeVisible();
  await context.close();
});

test("the retired fifth mask is absent from discovery, filters, sitemap and product routes", async ({
  page,
  request,
}) => {
  await ready(page, "/");
  await assertDemo(page);
  const spotlight = page.getByRole("region", {
    name: "A mask for your kind of day.",
  });
  await expect(spotlight.getByRole("button")).toHaveCount(4);
  await expect(
    spotlight.getByRole("button", { name: "Brightening", exact: true }),
  ).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Meet all four" })).toBeVisible();
  await ready(page, "/shop?concern=Dullness");
  await expect(page.getByRole("main").getByRole("article")).toHaveCount(3);
  await expect(page.getByText("Brightening Mask", { exact: true })).toHaveCount(
    0,
  );
  const response = await ready(page, "/products/brightening-mask");
  expect(response?.status()).toBe(404);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("/products/brightening-mask");
});

test("all ribbon messages remain readable inside the phone viewport", async ({
  page,
}) => {
  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await ready(page, "/");
    const ribbon = page.locator(".brand-ribbon");
    await ribbon.scrollIntoViewIfNeeded();
    const clipped = await ribbon.evaluate((element) => {
      const container = element.getBoundingClientRect();
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const clippedText: string[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent?.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        if (
          [...range.getClientRects()].some(
            (rect) =>
              rect.left < Math.max(0, container.left) - 1 ||
              rect.right > Math.min(window.innerWidth, container.right) + 1 ||
              rect.top < container.top - 1 ||
              rect.bottom > container.bottom + 1,
          )
        )
          clippedText.push(node.textContent);
      }
      return clippedText;
    });
    expect(clipped, `Clipped ribbon text at ${width}px`).toEqual([]);
    for (const text of [
      "REAL SKIN",
      "COLOURFUL CARE",
      "A MOMENT FOR YOU",
      "BRIGHTER DAYS",
    ]) {
      await expect(ribbon.getByText(text, { exact: true })).toBeVisible();
    }
  }
});
