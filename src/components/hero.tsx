"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { IngredientArt } from "@/components/ingredient-art";
import { BrandValueIcon } from "@/components/brand-value-icon";

export function Hero() {
  return (
    <section className="reference-hero" aria-labelledby="hero-heading">
      <div className="geometric-trim trim-left" aria-hidden="true" />
      <div className="reference-hero-copy">
        <p className="brand-kicker">INDIAN SKINCARE</p>
        <motion.h1
          id="hero-heading"
          initial={false}
          animate={{ opacity: [0.8, 1], y: [8, 0] }}
          transition={{ duration: 0.5 }}
        >
          Indian Skincare
          <br />
          for Real Life.
        </motion.h1>
        <p className="reference-hero-description">
          Thoughtful ingredients and modern actives,
          <br className="wide-break" /> made for the realities of life in India.
        </p>
        <Link href="/shop" className="button reference-cta">
          Explore our products <ArrowRight size={22} aria-hidden="true" />
        </Link>
        <div className="hero-values">
          <div>
            <BrandValueIcon kind="leaf-outline" />
            <span>
              Thoughtful
              <br />
              Ingredients
            </span>
          </div>
          <div>
            <BrandValueIcon kind="flask" />
            <span>
              No Unnecessary
              <br />
              Additives
            </span>
          </div>
          <div>
            <BrandValueIcon kind="hands" />
            <span>
              Made for
              <br />
              Real Life
            </span>
          </div>
        </div>
      </div>
      <div className="reference-hero-art">
        <Image
          className="hero-portrait"
          src="/images/reference/hero-woman.webp"
          alt="Front-facing geometric Indian woman with blue hair, vivid multicoloured facial shapes, a bindi and gold earrings"
          width={1200}
          height={1305}
          sizes="(max-width: 600px) 65vw, 36vw"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-ingredient hero-aloe">
          <IngredientArt kind="aloe" />
          <span>ALOE</span>
        </div>
        <div className="hero-ingredient hero-charcoal">
          <IngredientArt kind="charcoal" />
          <span>CHARCOAL</span>
        </div>
        <div className="hero-ingredient hero-citrus">
          <IngredientArt kind="orange-fruit" />
          <span>VITAMIN C</span>
        </div>
        <div className="hero-climate climate-sun">
          <IngredientArt kind="strong-sun" />
          <span>STRONG SUN</span>
        </div>
        <div className="hero-climate climate-water">
          <IngredientArt kind="humidity" />
          <span>HUMIDITY</span>
        </div>
        <div className="hero-climate climate-urban">
          <IngredientArt kind="cloud" />
          <span>URBAN LIFE</span>
        </div>
        <p className="hero-handwritten">
          “Rooted in India.
          <br />
          Made for real life.”
        </p>
      </div>
      <Image
        className="hero-corner-leaves"
        src="/images/reference/leaf-cluster.webp"
        alt=""
        aria-hidden="true"
        width={1200}
        height={1075}
        sizes="(max-width: 600px) 90px, 14vw"
      />
      <div className="geometric-trim trim-right" aria-hidden="true" />
    </section>
  );
}
