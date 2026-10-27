import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { IngredientArt, type ArtKind } from "@/components/ingredient-art";
import { BrandValueIcon } from "@/components/brand-value-icon";
import { Reveal } from "@/components/motion";
import { getProducts } from "@/lib/commerce";
import { getEditorialProduct } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Indian Skincare for Real Life",
  "Thoughtful ingredients and modern actives for real life in India. Discover SKINKARI Detan, Vitamin C, Hyaluronic Acid and Collagen & Peptide sheet masks.",
  "/",
);

const masks = [
  {
    handle: "detan-face-mask",
    title: "Detan Mask",
    description: "For sun-exposed, tired-looking skin.",
    color: "green",
  },
  {
    handle: "vitamin-c-radiance-face-mask",
    title: "Vitamin C Mask",
    description: "For dull-looking skin that needs a brighter boost.",
    color: "orange",
  },
  {
    handle: "hyaluronic-acid-face-mask",
    title: "Hyaluronic Acid Mask",
    description: "For skin that feels thirsty and needs hydration.",
    color: "blue",
  },
  {
    handle: "collagen-peptide-face-mask",
    title: "Collagen & Peptide Mask",
    description: "For skin that wants a plumper, bouncier feel.",
    color: "pink",
  },
] as const;

export default async function Home() {
  const products = await getProducts();
  const featured = masks.flatMap((mask) => {
    const product = products.find((item) => item.handle === mask.handle);
    return product ? [{ ...mask, product }] : [];
  });
  return (
    <div className="brand-home">
      <Hero />
      <section className="need-section" aria-labelledby="needs-heading">
        <h2 id="needs-heading">What does your skin need today?</h2>
        <div className="need-grid">
          {[
            {
              title: "I’m dull",
              name: "Vitamin C",
              handle: "vitamin-c-radiance-face-mask",
              kind: "sun",
              color: "orange",
            },
            {
              title: "I’m dehydrated",
              name: "Hyaluronic Acid",
              handle: "hyaluronic-acid-face-mask",
              kind: "water",
              color: "blue",
            },
            {
              title: "My skin looks tired",
              name: "Detan",
              handle: "detan-face-mask",
              kind: "leaf",
              color: "green",
            },
            {
              title: "I want plump, bouncy skin",
              name: "Collagen & Peptides",
              handle: "collagen-peptide-face-mask",
              kind: "sparkles",
              color: "pink",
            },
          ].map((item, index) => (
            <Reveal key={item.handle} delay={index * 0.04}>
              <Link
                className={`need-card accent-${item.color}`}
                href={`/products/${item.handle}`}
              >
                <IngredientArt kind={item.kind as ArtKind} />
                <h3>
                  {item.kind === "sparkles" ? (
                    <>
                      I want plump,
                      <br />
                      bouncy skin
                    </>
                  ) : (
                    item.title
                  )}
                </h3>
                <span>
                  <ArrowRight size={19} aria-hidden="true" />
                  {item.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section
        className="reference-ingredients"
        aria-labelledby="ingredients-heading"
      >
        <div className="ingredients-intro">
          <h2 id="ingredients-heading">
            Good stuff.
            <br />
            No gimmicks.
          </h2>
          <p>
            Every ingredient has a reason
            <br className="wide-break" /> to be here.
          </p>
        </div>
        <div className="ingredients-lineup">
          {[
            {
              name: "Charcoal",
              text: "Purifies pores",
              kind: "charcoal",
              handle: "detan-face-mask",
            },
            {
              name: "Green tea",
              text: "Soothes skin",
              kind: "leaf",
              handle: "detan-face-mask",
            },
            {
              name: "Aloe",
              text: "Hydrates skin",
              kind: "aloe",
              handle: "detan-face-mask",
            },
            {
              name: "Vitamin C",
              text: "Brightens skin",
              kind: "citrus",
              handle: "vitamin-c-radiance-face-mask",
            },
            {
              name: "Peptides",
              text: "Supports firmer skin",
              kind: "peptides",
              handle: "collagen-peptide-face-mask",
            },
            {
              name: "Collagen",
              text: "Helps maintain plump-looking skin",
              kind: "collagen",
              handle: "collagen-peptide-face-mask",
            },
          ].map((item) => (
            <Link
              className="ingredient-item"
              key={item.name}
              href={`/products/${item.handle}`}
            >
              <IngredientArt kind={item.kind as ArtKind} />
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section
        className="indian-skin-section"
        id="why-indian-skin"
        aria-labelledby="indian-skin-heading"
      >
        <div className="indian-skin-copy">
          <h2 id="indian-skin-heading">
            Made for
            <br />
            Indian skin.
          </h2>
          <p>
            Different climates. Different routines.
            <br />
            Same thoughtful care.
          </p>
          <div className="indian-skin-values">
            <div>
              <BrandValueIcon kind="sun" />
              <span>
                Real Indian
                <br />
                climates
              </span>
            </div>
            <div>
              <IngredientArt kind="leaf" />
              <span>
                Thoughtful
                <br />
                ingredients
              </span>
            </div>
            <div>
              <BrandValueIcon kind="flask" />
              <span>
                Considered
                <br />
                formulas
              </span>
            </div>
            <div>
              <BrandValueIcon kind="heart" />
              <span>
                Skin, not
                <br />
                standards
              </span>
            </div>
          </div>
        </div>
        <div className="indian-skin-art">
          <span className="story-graphic-sun" aria-hidden="true" />
          <Image
            src="/images/reference/story-woman.webp"
            alt="Geometric Indian woman in profile with a closed eye and pink lips, framed by faceted emerald leaves"
            width={1200}
            height={800}
            sizes="(max-width: 600px) 90vw, 43vw"
          />
        </div>
      </section>
      <section
        className="ritual-showcase"
        id="meet-the-masks"
        aria-labelledby="masks-heading"
      >
        <div className="showcase-heading">
          <h2 id="masks-heading">Four rituals. Many realities.</h2>
          <p>Four masks. Four skin moments.</p>
        </div>
        <div className="showcase-grid">
          {featured.map(({ product, title, description, color }, index) => {
            const artwork = product.images[0];
            const editorial = getEditorialProduct(product.handle);
            return (
              <Reveal
                key={product.id}
                className={`showcase-panel panel-${color}`}
                delay={index * 0.04}
              >
                <article>
                  <Link
                    href={`/products/${product.handle}`}
                    className="showcase-image-link"
                    aria-label={`Explore ${product.title}`}
                  >
                    {artwork && (
                      <Image
                        src={artwork.url}
                        alt={
                          artwork.altText ||
                          editorial?.imageAlt ||
                          product.title
                        }
                        width={artwork.width || 1098}
                        height={artwork.height || 1500}
                        sizes="(max-width: 600px) 38vw, 19vw"
                      />
                    )}
                  </Link>
                  <h3>{product.source === "demo" ? title : product.title}</h3>
                  <p>
                    {product.source === "demo"
                      ? description
                      : product.description}
                  </p>
                  <Link
                    href={`/products/${product.handle}`}
                    className="button"
                    aria-label={`View mask: ${product.title}`}
                  >
                    View mask <ArrowRight size={20} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
