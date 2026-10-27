"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-spark">✳</span> INDIAN SKINCARE FOR REAL LIFE
        </p>
        <motion.h1
          initial={false}
          animate={{ y: [12, 0], opacity: [0.75, 1] }}
          transition={{ duration: 0.7 }}
        >
          SAME SKIN.
          <br />
          BRIGHTER
          <br />
          <span>DAYS.</span>
          <svg
            className="headline-flower"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <g fill="currentColor">
              {Array.from({ length: 8 }, (_, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="24"
                  rx="12"
                  ry="24"
                  transform={`rotate(${i * 45} 50 50)`}
                />
              ))}
            </g>
            <circle cx="50" cy="50" r="12" fill="#faf4e8" />
          </svg>
        </motion.h1>
        <p className="hero-description">
          Real life. Real skin. A little extra care.
          <br />
          Meet the sheet masks that bring a little
          <br className="desktop-break" /> colour to your everyday.
        </p>
        <div className="hero-actions">
          <Link href="/shop" className="button">
            Find your good-skin moment <ArrowUpRight size={20} />
          </Link>
          <a
            href="#meet-the-masks"
            className="hero-scroll"
            aria-label="Explore the masks below"
          >
            <ArrowDownRight size={26} />
          </a>
        </div>
        <div className="hero-bottom-note">
          <span className="mini-rainbow" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>{" "}
          FIVE MASKS. YOUR MANY MOODS.
        </div>
      </div>
      <div className="hero-art">
        <div className="hero-arch" aria-hidden="true" />
        <span className="hero-art-star" aria-hidden="true">
          ✳
        </span>
        <span className="hero-vertical">A LITTLE CARE LOOKS GOOD ON YOU</span>
        <motion.div
          className="hero-pack hero-pack-back"
          initial={false}
          animate={{ rotate: [-15, -11], y: [12, 0] }}
          transition={{ duration: 0.9 }}
        >
          <Image
            src="/images/products/hyaluronic-acid.webp"
            alt="Blue illustrated Hyaluronic Acid Face Mask packaging"
            width={400}
            height={548}
            sizes="(max-width: 700px) 47vw, 25vw"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
        <motion.div
          className="hero-pack hero-pack-front"
          initial={false}
          animate={{ rotate: [13, 9], y: [25, 0] }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <Image
            src="/images/products/vitamin-c.webp"
            alt="Orange illustrated Vitamin C Radiance Face Mask packaging"
            width={400}
            height={548}
            sizes="(max-width: 700px) 47vw, 25vw"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
        <div className="hero-seal">
          <span>JUST</span>
          <strong>15</strong>
          <span>
            MINUTES
            <br />
            OF ME-TIME
          </span>
        </div>
        <span className="hero-art-bottom">
          GOOD SKIN. BRIGHTER DAYS. MORE YOU.
        </span>
      </div>
    </section>
  );
}
