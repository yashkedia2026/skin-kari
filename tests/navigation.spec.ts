import { expect, test } from "@playwright/test";

test("product search finds ingredients and keeps the query when filtering", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByText("DEMO STORE · CHECKOUT DISABLED", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Search products", exact: true })
    .click();
  const search = page.getByRole("dialog", { name: "Find your skin moment." });
  await expect(search).toBeVisible();
  await search
    .getByRole("searchbox", { name: "Search masks or ingredients" })
    .fill("aloe");
  await search
    .getByRole("button", { name: "Search masks", exact: true })
    .click();
  await expect(page).toHaveURL(/\/shop\?q=aloe$/);
  await expect(page.getByRole("main").getByRole("article")).toHaveCount(2);
  await page
    .getByRole("navigation", { name: "Filter by skin concern" })
    .getByRole("link", { name: "Dryness", exact: true })
    .click();
  await expect(page).toHaveURL(/concern=Dryness&q=aloe$/);
  await expect(page.getByRole("main").getByRole("article")).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      name: "Hyaluronic Acid Face Mask",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Clear search", exact: true }).click();
  await expect(page).toHaveURL(/\/shop\?concern=Dryness$/);
  await expect(page.getByRole("main").getByRole("article")).toHaveCount(1);
});

test("search supports Escape, restores focus and recovers from no results", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Search products",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const search = page.getByRole("dialog", { name: "Find your skin moment." });
  await expect(search).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(search).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.goto("/shop?q=there-is-no-such-mask");
  await expect(page.getByRole("main").getByRole("article")).toHaveCount(0);
  await expect(
    page
      .getByRole("main")
      .getByText("No masks match your search right now.", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("main")
    .getByRole("link", { name: "Explore all masks", exact: true })
    .click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.getByRole("main").getByRole("article")).toHaveCount(4);
});

test("the account control honestly explains unavailable sign-in", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page
      .getByRole("dialog", { name: "Navigation menu" })
      .getByRole("button", { name: "Your account", exact: true })
      .click();
  } else {
    await page
      .getByRole("button", { name: "Your account", exact: true })
      .click();
  }
  const account = page.getByRole("dialog", { name: "Your SKINKARI account." });
  await expect(account).toBeVisible();
  await expect(
    account.getByText(/Account sign-in isn’t available yet/),
  ).toBeVisible();
  await expect(
    account.getByText(/Orders and payments are not available/),
  ).toBeVisible();
  await account.getByRole("link", { name: "Explore the masks" }).click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(account).not.toBeVisible();
});
