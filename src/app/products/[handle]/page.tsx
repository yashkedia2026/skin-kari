import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { getProduct, getProducts } from "@/lib/commerce";
import { getEditorialProduct } from "@/data/products";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductPackSelectionProvider } from "@/components/product-pack-selection";
import { ProductPackImage } from "@/components/product-pack-image";
import { ProductCard } from "@/components/product-card";
import { VideoTestimonials } from "@/components/video-testimonials";
import { getProductTestimonials } from "@/data/video-testimonials";
import { getDemoSkincareVideos } from "@/data/demo-videos";
import purchaseStyles from "@/components/product-purchase.module.css";
import { jsonLd, pageMetadata, siteUrl } from "@/lib/seo";
type Props = { params: Promise<{ handle: string }> };
export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  return product
    ? pageMetadata(
        product.title,
        product.description.slice(0, 160),
        `/products/${handle}`,
      )
    : { title: "Mask not found" };
}
export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();
  const editorial = getEditorialProduct(handle);
  const image = product.images[0];
  const all = await getProducts();
  const benefits = product.details?.benefits || editorial?.benefits || [];
  const directions = product.details?.directions || editorial?.directions || [];
  const showPackagingDirections =
    editorial?.directions.length === 3 &&
    directions.length === 3 &&
    directions.every(
      (direction, index) => direction === editorial.directions[index],
    );
  const directionArtwork = ["apply-mask", "wait-fifteen", "pat-serum"];
  const ingredients =
    product.details?.featuredIngredients ||
    editorial?.featuredIngredients ||
    [];
  const caution = product.details?.caution || editorial?.caution || [];
  const offers =
    product.source === "shopify"
      ? product.variants
          .filter(
            (v) =>
              v.price &&
              Number.isFinite(Number(v.price.amount)) &&
              Number(v.price.amount) >= 0,
          )
          .map((v) => ({
            "@type": "Offer",
            url: `${siteUrl}/products/${handle}`,
            price: v.price!.amount,
            priceCurrency: v.price!.currencyCode,
            availability: `https://schema.org/${v.availableForSale ? "InStock" : "OutOfStock"}`,
            seller: { "@type": "Organization", name: "SKINKARI" },
          }))
      : undefined;
  return (
    <>
      <div
        className={`product-detail section tone-${editorial?.color || "orange"}`}
      >
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Face masks</Link>
          <span>/</span>
          <span>{product.title}</span>
        </nav>
        <ProductPackSelectionProvider key={product.id}>
          <div className="product-detail-grid">
            <ProductPackImage
              image={image}
              title={product.title}
              tone={editorial?.color || "orange"}
              netContent={
                product.details?.netContent || editorial?.packaging.netContent
              }
            />
            <div className="product-detail-copy">
              <p className="eyebrow">
                {editorial?.eyebrow || "A moment for your skin"}
              </p>
              <h1>{product.title}</h1>
              <p className="product-description">{product.description}</p>
              <ProductPurchase key={product.id} product={product} />
              {benefits.length > 0 && (
                <h2 className={purchaseStyles.benefitHeading}>
                  The good-skin benefits
                </h2>
              )}
              <ul className="benefit-list">
                {benefits.map((b) => (
                  <li key={b}>
                    <Check size={17} />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="product-accordions">
                <details open>
                  <summary>The ingredient edit</summary>
                  <div>
                    {ingredients.length ? (
                      <>
                        <p>{ingredients.map((i) => i.name).join(" · ")}</p>
                        <p className="small-note">
                          Featured ingredients from the packaging. The complete
                          ingredient list is pending confirmation.
                        </p>
                      </>
                    ) : (
                      <p>
                        The complete ingredient list is pending confirmation.
                      </p>
                    )}
                    <Link href="/ingredients" className="text-link">
                      Explore the ingredients <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </details>
                <details>
                  <summary>
                    {editorial?.directions.length &&
                    !product.details?.directions
                      ? "Your 15-minute ritual"
                      : "Directions for use"}
                  </summary>
                  {directions.length ? (
                    <ol
                      className={
                        showPackagingDirections
                          ? "packaging-directions"
                          : undefined
                      }
                    >
                      {directions.map((d, index) => (
                        <li key={d}>
                          {showPackagingDirections && (
                            <Image
                              src={`/images/ritual/${directionArtwork[index]}.webp`}
                              alt=""
                              width={72}
                              height={72}
                              sizes="72px"
                            />
                          )}
                          <span>{d}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>
                      Directions and wear time for this mask are awaiting
                      confirmation. Follow the final product pack before use.
                    </p>
                  )}
                </details>
                <details>
                  <summary>A little care before you care</summary>
                  {caution.length ? (
                    <ul>
                      {caution.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      Product-specific precautions are awaiting confirmation.
                      Read the final product pack before use.
                    </p>
                  )}
                </details>
                <details>
                  <summary>Delivery & returns</summary>
                  <p>
                    Delivery areas, charges and returns terms will be confirmed
                    before the store opens.{" "}
                    <Link href="/shipping-returns">See policy status.</Link>
                  </p>
                </details>
              </div>
            </div>
          </div>
        </ProductPackSelectionProvider>
        {product.source === "demo" && (
          <p className="artwork-caption">
            Packaging artwork preview extracted from the supplied design files.
            Final product photography is pending.
          </p>
        )}
      </div>
      <VideoTestimonials
        videos={getProductTestimonials(handle)}
        demoVideos={getDemoSkincareVideos(product.source)}
        tone={editorial?.color || "orange"}
      />
      <section className="section related-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MORE COLOURS OF CARE</p>
            <h2>More masks. More moments.</h2>
          </div>
          <Link href="/shop" className="text-link">
            View all masks{" "}
            <ArrowUpRight size={19} aria-hidden="true" focusable="false" />
          </Link>
        </div>
        <div className="product-grid related-grid">
          {all
            .filter((p) => p.handle !== handle)
            .slice(0, 3)
            .map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images.map((i) => new URL(i.url, siteUrl).href),
            brand: { "@type": "Brand", name: "SKINKARI" },
            ...(offers?.length ? { offers } : {}),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              {
                "@type": "ListItem",
                position: 2,
                name: "Face masks",
                item: `${siteUrl}/shop`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.title,
                item: `${siteUrl}/products/${handle}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
