import { expect, test, type Page } from "@playwright/test";
import { build } from "esbuild";
import path from "node:path";
import type { VideoTestimonial } from "../src/data/video-testimonials";
import {
  demoSkincareVideos,
  type DemoSkincareVideo,
} from "../src/data/demo-videos";

// The installed tsx test runner already supplies esbuild. Bundle this isolated
// component in memory: synthetic media fixtures never become storefront routes.
let script: string;
let css: string;

test.beforeAll(async () => {
  const bundle = await build({
    stdin: {
      contents: `
        import { createRoot } from 'react-dom/client';
        import { VideoTestimonials } from './src/components/video-testimonials';
        window.mountTestimonials = (videos, demoVideos) => createRoot(document.getElementById('root')).render(
          <VideoTestimonials videos={videos} demoVideos={demoVideos} tone="green" />
        );
      `,
      resolveDir: process.cwd(),
      loader: "tsx",
    },
    bundle: true,
    write: false,
    outfile: path.join(process.cwd(), "test-results/video-fixture.js"),
    platform: "browser",
    jsx: "automatic",
    define: { "process.env.NODE_ENV": '"development"' },
    loader: { ".css": "local-css" },
  });
  script = bundle.outputFiles.find((file) => file.path.endsWith(".js"))!.text;
  css = bundle.outputFiles.find((file) => file.path.endsWith(".css"))!.text;
});

const fixture = (id: string): VideoTestimonial => ({
  id,
  approved: true,
  title: `Test-only video ${id}`,
  src: `https://media.test/${id}.mp4`,
  poster:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800'%3E%3Crect width='600' height='800' fill='%2300744f'/%3E%3C/svg%3E",
  captions: [
    {
      src: `https://media.test/${id}.vtt`,
      srcLang: "en",
      label: "English",
      default: true,
    },
  ],
});

async function mount(
  page: Page,
  videos: VideoTestimonial[],
  demoVideos: readonly DemoSkincareVideo[] = [],
) {
  await page.route("https://media.test/**", (route) => route.abort());
  await page.setContent(
    '<!doctype html><html lang="en"><head><title>Isolated video component test</title></head><body><main id="root"></main></body></html>',
  );
  await page.addStyleTag({
    content: `
      * { box-sizing: border-box; }
      body { margin: 0; font-family: sans-serif; }
      h2, p { margin: 0; }
      .section { padding: 24px; }
      .tone-green { --tone-accent: #006343; --tone-bg: #00744f; }
      ${css}
    `,
  });
  await page.evaluate(() => {
    const playing = new WeakSet<HTMLMediaElement>();
    Object.defineProperty(HTMLMediaElement.prototype, "paused", {
      configurable: true,
      get() {
        return !playing.has(this);
      },
    });
    HTMLMediaElement.prototype.load = function () {};
    HTMLMediaElement.prototype.play = function () {
      playing.add(this);
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function () {
      playing.delete(this);
      this.dispatchEvent(new Event("pause"));
    };
  });
  await page.addScriptTag({ content: script });
  await page.evaluate(
    ({ entries, previews }) => {
      const fixtureWindow = window as typeof window & {
        mountTestimonials: (
          videos: VideoTestimonial[],
          demoVideos: readonly DemoSkincareVideo[],
        ) => void;
      };
      fixtureWindow.mountTestimonials(entries, previews);
    },
    { entries: videos, previews: demoVideos },
  );
}

test("empty and unapproved lists render no public section", async ({
  page,
}) => {
  await mount(page, []);
  await expect(page.getByRole("heading")).toHaveCount(0);
  await expect(page.locator("video")).toHaveCount(0);
  await mount(page, [{ ...fixture("pending"), approved: false }]);
  await expect(page.getByRole("heading")).toHaveCount(0);
  await expect(page.locator("video")).toHaveCount(0);
});

test("demo footage is disclosed separately and approved customer videos replace it", async ({
  page,
}) => {
  await mount(
    page,
    [{ ...fixture("pending"), approved: false }],
    demoSkincareVideos,
  );
  await expect(
    page.getByRole("heading", { name: "A little care, on film.", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Demo footage", { exact: true })).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "Video testimonials", exact: true }),
  ).toHaveCount(0);

  await mount(page, [fixture("approved")], demoSkincareVideos);
  await expect(
    page.getByRole("heading", { name: "Video testimonials", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Demo footage", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(
    page.getByRole("article", { name: "Test-only video approved" }),
  ).toBeVisible();
});

test("video loading waits for a gesture and native controls expose caption tracks", async ({
  page,
}) => {
  await mount(page, [fixture("one")]);
  const card = page.getByRole("article", { name: "Test-only video one" });
  const video = card.locator("video");
  await expect(card.locator("img")).toHaveAttribute("loading", "lazy");
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video).not.toHaveAttribute("src");
  await expect(video).not.toHaveAttribute("autoplay");
  await expect(video.locator("track")).toHaveCount(0);
  await expect(card.getByRole("heading")).toHaveCount(0);
  await card
    .getByRole("button", { name: "Watch: Test-only video one" })
    .click();
  await expect(video).toHaveAttribute("src", "https://media.test/one.mp4");
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video.locator("track")).toHaveAttribute("kind", "captions");
  await expect(video.locator("track")).toHaveAttribute("srclang", "en");
  await expect(video.locator("track")).toHaveAttribute("default", "");
  await expect(card.locator("img")).toHaveCount(0);
  await card
    .getByRole("button", { name: "Pause video: Test-only video one" })
    .click();
  await expect(
    card.getByRole("button", { name: "Play video: Test-only video one" }),
  ).toBeVisible();
  await expect(video).toHaveJSProperty("paused", true);
});

test("only one video plays, and playback pauses when a card leaves view", async ({
  page,
}) => {
  await mount(page, [fixture("one"), fixture("two"), fixture("three")]);
  await page
    .getByRole("button", { name: "Play video: Test-only video one" })
    .click();
  await expect(page.locator("video").nth(0)).toHaveJSProperty("paused", false);
  await page
    .getByRole("button", { name: "Play video: Test-only video two" })
    .click();
  await expect(page.locator("video").nth(0)).toHaveJSProperty("paused", true);
  await expect(page.locator("video").nth(1)).toHaveJSProperty("paused", false);
  await page.evaluate(() => {
    const spacer = document.createElement("div");
    spacer.style.height = "2000px";
    document.body.append(spacer);
    window.scrollTo(0, 2000);
  });
  await expect(page.locator("video").nth(1)).toHaveJSProperty("paused", true);
});

test("play failures show a retry message and supplied transcripts are available", async ({
  page,
}) => {
  await mount(page, [
    { ...fixture("one"), transcript: "Test-only transcript." },
  ]);
  await page.evaluate(() => {
    HTMLMediaElement.prototype.play = function () {
      return Promise.reject(
        new DOMException("Test-only error", "NotSupportedError"),
      );
    };
  });
  await page
    .getByRole("button", { name: "Play video: Test-only video one" })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "This video couldn’t play",
  );
  await expect(
    page.getByRole("button", { name: "Try again: Test-only video one" }),
  ).toHaveText("Try again");
  await page.getByText("Read video transcript").click();
  await expect(page.getByText("Test-only transcript.")).toBeVisible();
});

test("carousel stays inside the viewport and reduced motion removes transitions", async ({
  page,
  isMobile,
}) => {
  await mount(page, [
    fixture("one"),
    fixture("two"),
    fixture("three"),
    fixture("four"),
  ]);
  const carousel = page.getByRole("region", {
    name: "Customer testimonial videos",
  });
  const geometry = await carousel.evaluate((element) => ({
    scrollable: element.scrollWidth > element.clientWidth,
    documentFits: document.documentElement.scrollWidth <= window.innerWidth,
    snap: getComputedStyle(element).scrollSnapType,
  }));
  expect(geometry).toEqual({
    scrollable: true,
    documentFits: true,
    snap: "x mandatory",
  });
  await page.getByRole("button", { name: "Next videos" }).click();
  await expect
    .poll(() => carousel.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Previous videos" }).click();
  await expect
    .poll(() => carousel.evaluate((element) => element.scrollLeft))
    .toBe(0);
  const transition = await page
    .getByRole("button", { name: "Play video: Test-only video one" })
    .evaluate((button) => getComputedStyle(button).transitionDuration);
  expect(transition).toBe("0s");
  if (isMobile) {
    const width = await carousel
      .locator("article")
      .first()
      .evaluate((card) => card.getBoundingClientRect().width);
    const viewportWidth = page.viewportSize()!.width;
    expect(width).toBeLessThan(viewportWidth);
    expect(width).toBeGreaterThan(viewportWidth * 0.6);
  }
});
