import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandSpark } from "@/components/brand-spark";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow">A LITTLE CARE. A LOT OF COLOUR.</p>
          <h2>
            Good skin days.
            <br />
            <span>Your kind of days.</span>
          </h2>
          <Link className="text-link" href="/shop">
            Find your mask <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            <Link href="/shop">All face masks</Link>
            <Link href="/about">Our story</Link>
            <Link href="/ingredients">Ingredients</Link>
            <Link href="/journal">The journal</Link>
          </div>
          <div>
            <h3>Here to help</h3>
            <Link href="/faqs">FAQs</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/shipping-returns">Shipping & returns</Link>
            <Link href="/cart">Your bag</Link>
          </div>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        SKINKARI
        <span>
          <BrandSpark />
        </span>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} SKINKARI. Same skin. Brighter days.
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <span>Made for real life ↗</span>
        </div>
      </div>
    </footer>
  );
}
