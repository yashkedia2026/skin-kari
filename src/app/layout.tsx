import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { MotionProvider } from "@/components/motion";
import { indexingEnabled, jsonLd, siteUrl } from "@/lib/seo";
import { isDemoMode } from "@/lib/commerce";
import "./globals.css";
import "./redesign.css";
import "./commerce-redesign.css";
import "@/components/navigation-redesign.css";
const displayFont = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/oswald/files/oswald-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/oswald/files/oswald-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../../node_modules/@fontsource/oswald/files/oswald-latin-600-normal.woff2",
      weight: "600",
    },
    {
      path: "../../node_modules/@fontsource/oswald/files/oswald-latin-700-normal.woff2",
      weight: "700",
    },
  ],
  variable: "--font-display-source",
  display: "swap",
});
const handwritingFont = localFont({
  src: "../../node_modules/@fontsource/caveat/files/caveat-latin-600-normal.woff2",
  variable: "--font-handwriting",
  display: "swap",
  weight: "600",
  preload: false,
});
const bodyFont = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--font-body-source",
  display: "swap",
  weight: "100 1000",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SKINKARI — Same skin. Brighter days.",
    template: "%s | SKINKARI",
  },
  description:
    "Indian skincare for real life. Discover four colourful sheet masks and find a little care for your kind of day.",
  robots: indexingEnabled
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${displayFont.variable} ${bodyFont.variable} ${handwritingFont.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <CartProvider>
            <Header demo={isDemoMode()} />
            <main id="main">{children}</main>
            <Footer />
          </CartProvider>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SKINKARI",
              url: siteUrl,
              logo: `${siteUrl}/images/products/brand-wordmark.webp`,
              slogan: "SAME SKIN. BRIGHTER DAYS.",
            }),
          }}
        />
      </body>
    </html>
  );
}
