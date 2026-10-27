import Link from "next/link";
import { getProducts } from "@/lib/commerce";
import { getEditorialProduct } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { BrandSpark } from "@/components/brand-spark";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Shop all face masks",
  "Explore five SKINKARI sheet masks. Shop by dullness, dryness, fine lines or uneven tone, using benefits stated on the packaging.",
  "/shop",
);
const concerns = [
  "All masks",
  "Dullness",
  "Dryness",
  "Fine lines",
  "Uneven tone",
];
export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ concern?: string }>;
}) {
  const { concern } = await searchParams;
  const selected = concerns.includes(concern || "") ? concern : "All masks";
  const products = await getProducts();
  const filtered =
    selected === "All masks"
      ? products
      : products.filter((p) =>
          getEditorialProduct(p.handle)?.concerns.includes(selected || ""),
        );
  return (
    <div className="shop-page section">
      <div className="shop-intro">
        <p className="eyebrow">FIVE MASKS. SO MANY GOOD-SKIN MOMENTS.</p>
        <h1>
          A little care.
          <br />
          <em>Your kind of colour.</em>
        </h1>
        <p>
          Discover a little care for your skin. Start with a feeling, find your
          mask.
        </p>
      </div>
      <div className="shop-toolbar">
        <nav className="filter-pills" aria-label="Filter by skin concern">
          {concerns.map((c) => (
            <Link
              key={c}
              href={
                c === "All masks"
                  ? "/shop"
                  : `/shop?concern=${encodeURIComponent(c)}`
              }
              aria-current={selected === c ? "true" : undefined}
            >
              {c}
            </Link>
          ))}
        </nav>
        <span>
          {filtered.length} {filtered.length === 1 ? "mask" : "masks"}
        </span>
      </div>
      <div
        className={`product-grid ${filtered.length === 5 ? "product-grid-five" : ""}`}
      >
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="empty-state">
          No masks match this concern right now.{" "}
          <Link href="/shop">Explore all masks</Link>.
        </p>
      )}
      <div className="shop-footer-note">
        <span>
          <BrandSpark />
        </span>
        <p>
          Same skin. A different kind of day.
          <br />
          Explore each mask’s ingredients and directions before choosing.
        </p>
        <Link href="/ingredients" className="text-link">
          Ingredient guide ↗
        </Link>
      </div>
    </div>
  );
}
