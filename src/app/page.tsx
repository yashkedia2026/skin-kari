import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Droplets,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { Spotlight } from "@/components/spotlight";
import { Reveal } from "@/components/motion";
import { getProducts } from "@/lib/commerce";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Same skin. Brighter days.",
  "Meet SKINKARI: Indian skincare for real life. Discover Vitamin C, Hyaluronic Acid, Collagen & Peptide and Detan sheet masks.",
  "/",
);
export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Hero />
      <div className="brand-ribbon" aria-hidden="true">
        <span>REAL SKIN</span>
        <span>✳</span>
        <span>COLOURFUL CARE</span>
        <span>✳</span>
        <span>YOUR 15-MINUTE MOMENT</span>
        <span>✳</span>
        <span>BRIGHTER DAYS</span>
        <span>✳</span>
      </div>
      <section className="section product-discovery" id="meet-the-masks">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">MEET YOUR COLOUR OF CARE</p>
              <h2>
                Little masks.
                <br className="mobile-break" />{" "}
                <em>Big main-character energy.</em>
              </h2>
            </div>
            <Link className="text-link" href="/shop">
              Meet all four <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
        <div className="product-grid">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.05}>
              <ProductCard product={product} index={index} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section concern-section">
        <div>
          <p className="eyebrow">LET’S TALK ABOUT YOUR SKIN</p>
          <h2>
            What’s the
            <br />
            <em>feeling today?</em>
          </h2>
          <p>
            A little dull? A little dry?
            <br />
            Start with what your skin is asking for.
          </p>
        </div>
        <div className="concern-grid">
          {[
            {
              name: "A little dull",
              concern: "Dullness",
              label: "Bring on the radiance",
              icon: Sun,
              color: "orange",
            },
            {
              name: "Feeling thirsty",
              concern: "Dryness",
              label: "A moment of hydration",
              icon: Droplets,
              color: "blue",
            },
            {
              name: "Fine lines",
              concern: "Fine lines",
              label: "A softer, smoother look",
              icon: Waves,
              color: "pink",
            },
            {
              name: "Uneven tone",
              concern: "Uneven tone",
              label: "Find your fresh start",
              icon: Sparkles,
              color: "green",
            },
          ].map(({ name, concern, label, icon: Icon, color }) => (
            <Link
              href={`/shop?concern=${encodeURIComponent(concern)}`}
              className={`concern-card tone-${color}`}
              key={name}
            >
              <Icon size={34} strokeWidth={1.2} />
              <div>
                <h3>{name}</h3>
                <span>{label}</span>
              </div>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <Spotlight products={products.slice(0, 4)} />
      <section className="section story-section">
        <Reveal className="story-art">
          <span className="story-arch" />
          <span className="story-sun">✳</span>
          <p>
            ROOTED IN
            <br />
            <strong>COLOUR.</strong>
            <br />
            MADE FOR
            <br />
            <strong>REAL LIFE.</strong>
          </p>
          <span className="story-art-footer">THE SKINKARI STATE OF MIND ↗</span>
        </Reveal>
        <Reveal className="story-copy">
          <p className="eyebrow">A LITTLE BIT OF US</p>
          <h2>
            For your skin.
            <br />
            For your day.
            <br />
            <em>For the real you.</em>
          </h2>
          <p>
            Some days are full-on. Some days are slow. Your skincare can meet
            you right where you are.
          </p>
          <p>
            SKINKARI brings together expressive Indian-inspired art and a simple
            sheet-mask ritual. A little pause. A little colour. A moment that’s
            yours.
          </p>
          <Link href="/about" className="text-link">
            Get to know SKINKARI <ArrowUpRight size={19} />
          </Link>
        </Reveal>
      </section>
      <section className="ingredient-strip section">
        <div>
          <p className="eyebrow">ON THE PACK. IN THE SPOTLIGHT.</p>
          <h2>
            Get familiar
            <br />
            <em>with the ingredients.</em>
          </h2>
          <Link href="/ingredients" className="text-link">
            Read the ingredient guide <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="ingredient-tiles">
          <Link
            href="/products/vitamin-c-radiance-face-mask"
            className="ingredient-tile citrus"
          >
            <span className="ingredient-symbol" aria-hidden="true">
              ◉
            </span>
            <h3>Vitamin C</h3>
            <p>The radiance edit</p>
          </Link>
          <Link
            href="/products/hyaluronic-acid-face-mask"
            className="ingredient-tile water"
          >
            <Droplets className="ingredient-symbol" strokeWidth={1} />
            <h3>Hyaluronic acid</h3>
            <p>The hydration edit</p>
          </Link>
          <Link
            href="/products/detan-face-mask"
            className="ingredient-tile leaf"
          >
            <span className="leaf-symbol" aria-hidden="true" />
            <h3>Green tea</h3>
            <p>The fresh-start edit</p>
          </Link>
        </div>
      </section>
      <section className="section ritual-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SMALL RITUAL. BRIGHTER DAY.</p>
            <h2>
              Your pause,
              <br />
              <em>in three simple steps.</em>
            </h2>
          </div>
          <span className="ritual-time">
            15 MINUTES
            <br />
            <strong>ALL YOURS.</strong>
          </span>
        </div>
        <div className="ritual-grid">
          {[
            {
              n: "01",
              title: "Fresh face. Fresh start.",
              text: "Apply your sheet mask to a freshly cleansed face.",
              icon: "◡",
            },
            {
              n: "02",
              title: "Take fifteen.",
              text: "Leave it on for 15 minutes, then gently remove the mask.",
              icon: "15",
            },
            {
              n: "03",
              title: "Pat. Glow. Go.",
              text: "Pat the remaining serum into your face and neck.",
              icon: "✳",
            },
          ].map((step) => (
            <Reveal className="ritual-step" key={step.n}>
              <div className="ritual-step-top">
                <span>{step.n}</span>
                <span className="ritual-icon" aria-hidden="true">
                  {step.icon}
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
        <Link href="/shop" className="text-link">
          Make a little time for you <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}
