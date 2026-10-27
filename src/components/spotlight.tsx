"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { getEditorialProduct } from "@/data/products";
import type { Product } from "@/lib/commerce/types";
export function Spotlight({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const product = products[active] || products[0];
  if (!product) return null;
  const editorial = getEditorialProduct(product.handle);
  const p = {
    ...product,
    color: editorial?.color || "orange",
    eyebrow: editorial?.eyebrow || "A moment for you",
    image: product.images[0]?.url,
    imageAlt: product.images[0]?.altText || product.title,
  };
  return (
    <section
      className={`spotlight tone-${p.color}`}
      aria-labelledby="spotlight-heading"
    >
      <div className="spotlight-copy">
        <p className="eyebrow">YOUR LITTLE PICK-ME-UP</p>
        <h2 id="spotlight-heading">
          A mask for
          <br />
          <em>your kind of day.</em>
        </h2>
        <div
          className="spotlight-tabs"
          role="group"
          aria-label="Explore a mask"
        >
          {products.map((product, i) => (
            <button
              key={product.handle}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span
                style={{
                  background:
                    getEditorialProduct(product.handle)?.accent ||
                    "var(--orange)",
                }}
              />
              {getEditorialProduct(product.handle)?.shortName || product.title}
            </button>
          ))}
        </div>
        <div className="spotlight-detail" aria-live="polite">
          <p className="eyebrow">{p.eyebrow}</p>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <Link href={`/products/${p.handle}`} className="button">
            Get to know your mask <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
      <div className="spotlight-art">
        <div className="spotlight-circle" aria-hidden="true" />
        <span className="spotlight-star" aria-hidden="true">
          ✳
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.handle}
            initial={{ opacity: 0, rotate: -5, y: 15 }}
            animate={{ opacity: 1, rotate: 5, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {p.image && (
              <Image
                src={p.image}
                alt={p.imageAlt}
                width={product.images[0]?.width || 1098}
                height={product.images[0]?.height || 1500}
                sizes="(max-width: 700px) 65vw, 30vw"
              />
            )}
          </motion.div>
        </AnimatePresence>
        <span className="spotlight-art-caption">
          ONE SHEET. A MOMENT FOR YOU.
        </span>
      </div>
    </section>
  );
}
