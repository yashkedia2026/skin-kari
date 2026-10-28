import { mkdir } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { demoSkincareVideos } from "../src/data/demo-videos";

test("demo skincare videos load on request, play real footage and remain clearly labelled", async ({
  page,
  isMobile,
}, testInfo) => {
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (
      request.resourceType() === "media" ||
      /\.(?:mp4|webm|vtt)(?:\?|$)/.test(request.url())
    ) {
      mediaRequests.push(request.url());
    }
  });
  await page.goto("/products/vitamin-c-radiance-face-mask");
  await expect(
    page.getByText("DEMO STORE · CHECKOUT DISABLED", { exact: true }),
  ).toBeVisible();
  const section = page.getByRole("region", {
    name: "A little care, on film.",
    exact: true,
  });
  const carousel = section.getByRole("region", {
    name: "Skincare demo videos",
    exact: true,
  });
  await section.scrollIntoViewIfNeeded();
  await expect(
    section.getByText("Demo video preview", { exact: true }),
  ).toBeVisible();
  await expect(
    section.getByText(
      "Sample skincare footage for layout preview. Client videos will replace these clips.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(section.getByText("Demo footage", { exact: true })).toHaveCount(
    3,
  );
  await expect(
    page.getByRole("heading", { name: "Video testimonials", exact: true }),
  ).toHaveCount(0);

  const cards = carousel.getByRole("article");
  await expect(cards).toHaveCount(3);
  for (const card of await cards.all()) {
    const thumbnail = card.locator("img");
    await expect(thumbnail).toHaveAttribute("loading", "lazy");
    await thumbnail.evaluate(async (image) => {
      if (!(image instanceof HTMLImageElement))
        throw new Error("Expected a thumbnail");
      image.loading = "eager";
      await image.decode();
    });
    const video = card.locator("video");
    await expect(video).toHaveAttribute("preload", "none");
    await expect(video).not.toHaveAttribute("src");
    await expect(video).not.toHaveAttribute("autoplay");
  }
  expect(mediaRequests).toEqual([]);
  const geometry = await carousel.evaluate((element) => ({
    documentFits:
      document.documentElement.scrollWidth <=
      document.documentElement.clientWidth,
    bodyFits: document.body.scrollWidth <= document.documentElement.clientWidth,
    viewportWidth: window.innerWidth,
    layoutWidth: document.documentElement.clientWidth,
    scrollable: element.scrollWidth > element.clientWidth,
  }));
  expect(geometry.documentFits).toBe(true);
  expect(geometry.bodyFits).toBe(true);
  if (isMobile) {
    // Out-of-flow labels must remain contained by their carousel cards; an
    // expanded mobile layout viewport changes hit coordinates and scrolling.
    expect(geometry.viewportWidth).toBe(geometry.layoutWidth);
    expect(geometry.scrollable).toBe(true);
    await section
      .getByRole("button", { name: "Next videos", exact: true })
      .click();
    await expect
      .poll(() => carousel.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0);
    await section
      .getByRole("button", { name: "Previous videos", exact: true })
      .click();
    await expect
      .poll(() => carousel.evaluate((element) => element.scrollLeft))
      .toBe(0);
  }

  const accessibility = await new AxeBuilder({ page })
    .include('[aria-label="Skincare demo videos"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.evaluate(() => document.fonts.ready);
  await mkdir("docs/previews/videos", { recursive: true });
  await section.screenshot({
    path: `docs/previews/videos/${testInfo.project.name}-skincare-demo.png`,
    style: "header, header *, nextjs-portal { visibility: hidden !important; }",
  });

  // Use the real browser decoder here, without the media stubs used by the
  // isolated component tests. Every demo asset must actually load and play.
  for (let index = 0; index < demoSkincareVideos.length; index++) {
    const card = cards.nth(index);
    await card.scrollIntoViewIfNeeded();
    const video = card.locator("video");
    await card
      .getByRole("button", {
        name: `Watch: ${demoSkincareVideos[index].title}`,
        exact: true,
      })
      .click();
    await expect(video).toHaveAttribute("src", demoSkincareVideos[index].src);
    await expect(video).toHaveJSProperty("paused", false);
    await expect
      .poll(() =>
        video.evaluate((element) => (element as HTMLVideoElement).currentTime),
      )
      .toBeGreaterThan(0.1);
    await expect
      .poll(() =>
        video.evaluate((element) => (element as HTMLVideoElement).videoWidth),
      )
      .toBeGreaterThan(0);
    await card
      .getByRole("button", {
        name: `Pause video: ${demoSkincareVideos[index].title}`,
        exact: true,
      })
      .click();
    await expect(video).toHaveJSProperty("paused", true);
    expect(
      await video.evaluate(
        (element) => (element as HTMLVideoElement).error?.message || null,
      ),
    ).toBeNull();
  }
});
