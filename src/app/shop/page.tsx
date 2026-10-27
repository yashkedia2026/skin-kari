import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getProducts } from "@/lib/commerce";
import { getEditorialProduct } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { BrandSpark } from "@/components/brand-spark";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Shop all face masks",
  "Explore four SKINKARI sheet masks. Shop by dullness, dryness, fine lines or uneven tone, using benefits stated on the packaging.",
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
  searchParams: Promise<{ concern?: string | string[]; q?: string | string[] }>;
}) {
  const params = await searchParams;
  const concern = typeof params.concern === "string" ? params.concern : "";
  const query =
    typeof params.q === "string" ? params.q.trim().slice(0, 80) : "";
  const selected = concerns.includes(concern || "") ? concern : "All masks";
  const products = await getProducts();
  const terms = query.toLocaleLowerCase("en-IN").split(/\s+/).filter(Boolean);
  const filtered = products.filter((product) => {
    const editorial = getEditorialProduct(product.handle);
    const matchesConcern =
      selected === "All masks" || editorial?.concerns.includes(selected);
    const searchable = [
      product.title,
      product.description,
      ...(editorial?.concerns ?? []),
      ...(editorial?.benefits ?? []),
      ...(
        product.details?.featuredIngredients ??
        editorial?.featuredIngredients ??
        []
      ).map((ingredient) => ingredient.name),
    ]
      .join(" ")
      .toLocaleLowerCase("en-IN");
    return matchesConcern && terms.every((term) => searchable.includes(term));
  });
  function filterHref(value: string) {
    const search = new URLSearchParams();
    if (value !== "All masks") search.set("concern", value);
    if (query) search.set("q", query);
    return `/shop${search.size ? `?${search}` : ""}`;
  }
  return (
    <div className="shop-page section">
      <div className="shop-intro">
        <p className="eyebrow">FOUR MASKS. SO MANY GOOD-SKIN MOMENTS.</p>
        <h1>
          A little care.
          <br />
          <em>Your kind of colour.</em>
        </h1>
        <p>
          Discover a little care for your skin. Start with a feeling, find your
          mask.
        </p>
        <form action="/shop" method="get" className="shop-search">
          <label htmlFor="shop-product-search">
            Search masks or ingredients
          </label>
          {selected !== "All masks" && (
            <input type="hidden" name="concern" value={selected} />
          )}
          <div className="brand-search-field">
            <input
              id="shop-product-search"
              name="q"
              type="search"
              maxLength={80}
              defaultValue={query}
              placeholder="Try Vitamin C"
            />
            <button type="submit" aria-label="Search masks">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </form>
        {query && (
          <p className="shop-search-summary">
            Results for “{query}”.{" "}
            <Link
              href={
                selected === "All masks"
                  ? "/shop"
                  : `/shop?concern=${encodeURIComponent(selected)}`
              }
            >
              Clear search
            </Link>
          </p>
        )}
      </div>
      <div className="shop-toolbar">
        <nav className="filter-pills" aria-label="Filter by skin concern">
          {concerns.map((c) => (
            <Link
              key={c}
              href={filterHref(c)}
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
      <div className="product-grid">
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="empty-state">
          No masks match {query ? "your search" : "this concern"} right now.{" "}
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
          Ingredient guide{" "}
          <ArrowUpRight size={18} aria-hidden="true" focusable="false" />
        </Link>
      </div>
    </div>
  );
}
