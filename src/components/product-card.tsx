import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/commerce/types";
import { getEditorialProduct } from "@/data/products";
import { QuickAdd } from "./product-purchase";
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const editorial = getEditorialProduct(product.handle);
  const image = product.images[0];
  return (
    <article className={`product-card tone-${editorial?.color || "orange"}`}>
      <Link className="product-card-art" href={`/products/${product.handle}`}>
        <div className="card-topline">
          <span>
            0{index + 1} / {editorial?.eyebrow || "Meet your mask"}
          </span>
          <ArrowUpRight size={20} aria-hidden="true" focusable="false" />
        </div>
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            width={image.width || 1098}
            height={image.height || 1500}
            sizes="(max-width: 420px) 75vw, (max-width: 900px) 40vw, 22vw"
            className="product-pack"
          />
        )}
        <span className="product-card-note">
          {editorial?.packaging.format} {editorial && "·"}{" "}
          {product.details?.netContent || editorial?.packaging.netContent}
        </span>
      </Link>
      <div className="product-card-info">
        <span className="eyebrow">
          {editorial?.concerns.join(" + ") || "Sheet mask"}
        </span>
        <h3>
          <Link href={`/products/${product.handle}`}>{product.title}</Link>
        </h3>
        <p>
          {product.details?.featuredIngredients
            ?.map((x) => x.name)
            .join(" · ") ||
            editorial?.featuredIngredients.map((x) => x.name).join(" · ")}
        </p>
        <QuickAdd product={product} />
      </div>
    </article>
  );
}
