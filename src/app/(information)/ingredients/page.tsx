import Link from "next/link";
import { products } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Meet the Ingredients",
  "Explore the featured ingredients named on SKINKARI’s Vitamin C, Hyaluronic Acid, Collagen & Peptide and Detan sheet-mask packaging.",
  "/ingredients",
);

const introductions: Record<string, string> = {
  orange:
    "Vitamin C leads the orange pack, alongside niacinamide and licorice extract. This is our mask with a focus on dull-looking skin and radiance.",
  blue: "Hyaluronic acid headlines the blue pack. Ceramides, panthenol and aloe vera join it on the front of our hydration-focused mask.",
  pink: "Collagen and peptides give the pink mask its name, with squalane also featured on the pack. Its focus: hydration and smoother-looking skin.",
  green:
    "Activated charcoal, green tea extract, aloe vera and niacinamide are named on the green pack. Its focus: the appearance of dullness and uneven tone.",
};

export default function IngredientsPage() {
  return (
    <article className="editorial-page">
      <p className="page-eyebrow">Good things, by name</p>
      <h1 className="page-title">
        Get to know
        <br />
        <em>your mask.</em>
      </h1>
      <p className="page-intro">
        Four colourful packs. A few familiar names. Here’s a closer look at the
        featured ingredients printed on each one.
      </p>
      <div className="info-grid">
        {products.map((product) => (
          <section
            key={product.handle}
            className="info-card"
            style={{ background: product.background }}
          >
            <p className="page-eyebrow">{product.shortName}</p>
            <h2>{product.title}</h2>
            <p>{introductions[product.color]}</p>
            <ul>
              {product.featuredIngredients.map((ingredient) => (
                <li key={ingredient.name}>{ingredient.name}</li>
              ))}
            </ul>
            <Link className="text-link" href={`/products/${product.handle}`}>
              Meet the mask <span aria-hidden="true">↗</span>
            </Link>
          </section>
        ))}
      </div>
      <div className="prose">
        <h2>A featured ingredient is part of the picture.</h2>
        <p>
          These are the names highlighted on the front of the packaging, not
          complete ingredient lists. Concentrations and full ingredient lists
          have not been provided in the supplied artwork, so they are not shown
          here.
        </p>
        <p>
          For the full formula, refer to the final product pack once available.
          The benefits described on this site refer to each mask as a whole;
          they are not a promise about what an individual ingredient will do for
          your skin.
        </p>
        <Link className="text-link" href="/journal/reading-your-mask-pack">
          A little guide to reading your pack <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
