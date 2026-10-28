"use client";

import Image from "next/image";
import type { ProductColor } from "@/data/products";
import type { Product } from "@/lib/commerce/types";
import { useProductPackSelection } from "./product-pack-selection";
import styles from "./product-pack-image.module.css";

export function ProductPackImage({
  image,
  title,
  tone,
  netContent,
}: {
  image?: Product["images"][number];
  title: string;
  tone: ProductColor;
  netContent?: string;
}) {
  const { quantity } = useProductPackSelection();
  const stacked = quantity > 1;
  const dimensions = {
    width: image?.width || 1098,
    height: image?.height || 1500,
    sizes: "(max-width: 700px) 65vw, 35vw",
  };

  return (
    <figure
      className={`product-detail-art tone-${tone} ${styles.art}`}
      aria-label="Selected pack preview"
      data-quantity={quantity}
      data-stacked={stacked}
    >
      <div className={styles.stage}>
        {image && (
          <>
            {stacked && (
              <>
                <Image
                  {...dimensions}
                  className={`${styles.packet} ${styles.backLeft}`}
                  src={image.url}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                />
                <Image
                  {...dimensions}
                  className={`${styles.packet} ${styles.backRight}`}
                  src={image.url}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                />
              </>
            )}
            <Image
              {...dimensions}
              className={`${styles.packet} ${styles.front}`}
              src={image.url}
              alt={image.altText || title}
              loading="eager"
              fetchPriority="high"
            />
          </>
        )}
      </div>
      <figcaption className={styles.caption}>
        <strong>{stacked ? `Pack of ${quantity}` : "Single Mask"}</strong>
        <span>
          {quantity} individual sheet {stacked ? "masks" : "mask"}
          {netContent && ` · ${netContent} each`}
        </span>
      </figcaption>
    </figure>
  );
}
