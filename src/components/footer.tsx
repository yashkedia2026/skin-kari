import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type FooterDestination = { label: string; href?: string };

const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Best Sellers" },
      { label: "New Arrivals" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability" },
      { label: "Careers" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faqs" },
      { label: "Shipping", href: "/shipping-returns" },
      { label: "Track Order" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
] satisfies { title: string; links: FooterDestination[] }[];

const socialNames = [
  "Instagram",
  "YouTube",
  "Pinterest",
  "Facebook",
  "WhatsApp",
];

function SocialMark({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {name === "Instagram" && (
        <>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="17.5" cy="6.5" r="1.3" />
        </>
      )}
      {name === "YouTube" && (
        <>
          <path d="M21.5 6.1a3 3 0 0 0-2.1-2.1C17.5 3.5 12 3.5 12 3.5s-5.5 0-7.4.5a3 3 0 0 0-2.1 2.1C2 8 2 12 2 12s0 4 .5 5.9A3 3 0 0 0 4.6 20c1.9.5 7.4.5 7.4.5s5.5 0 7.4-.5a3 3 0 0 0 2.1-2.1C22 16 22 12 22 12s0-4-.5-5.9Z" />
          <path fill="var(--cream)" d="m10 8 6 4-6 4Z" />
        </>
      )}
      {name === "Pinterest" && (
        <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.8 1.4 1.8 1.7 0 3-1.8 3-4.5 0-2.3-1.7-3.9-4.1-3.9-2.8 0-4.5 2.1-4.5 4.3 0 .9.4 1.7.8 2.2l.2.4-.3 1.2c0 .2-.1.2-.3.2-1.3-.6-2.1-2.3-2.1-4.1 0-3.3 2.4-6.3 6.7-6.3 3.5 0 6.3 2.5 6.3 5.9 0 3.5-2.2 6.4-5.2 6.4-1 0-2-.6-2.4-1.2l-.6 2.5c-.2.9-.9 2-1.3 2.7A10 10 0 1 0 12 2Z" />
      )}
      {name === "Facebook" && (
        <path d="M22 12A10 10 0 1 0 10.4 21.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
      )}
      {name === "WhatsApp" && (
        <>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            d="M21 11.5a9 9 0 0 1-13.4 7.8L3 20.5l1.2-4.4A9 9 0 1 1 21 11.5Z"
          />
          <path d="M8.2 6.7c-.4 0-.9.5-1.1 1-.6 1.4.4 3.5 2.2 5.2 1.8 1.8 3.7 2.8 5.1 2.4.7-.2 1.3-.8 1.5-1.4.1-.4.1-.6-.2-.8l-1.9-.9c-.3-.2-.5-.1-.7.2l-.7.8c-.2.2-.4.2-.7.1-1.2-.6-2.2-1.5-2.8-2.6-.2-.3-.1-.5.1-.7l.5-.7c.2-.3.2-.5.1-.8l-.8-1.6c-.1-.2-.4-.3-.6-.3Z" />
        </>
      )}
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="site-footer brand-footer">
      <div className="brand-footer-grid">
        <div className="brand-footer-intro">
          <Link href="/" aria-label="Skinkari home" className="wordmark">
            <Image
              src="/images/products/brand-wordmark.webp"
              alt="SKINKARI"
              width={950}
              height={360}
              sizes="(max-width: 600px) 135px, (max-width: 1100px) 145px, 200px"
            />
          </Link>
          <p>
            MADE IN INDIA.
            <br />
            FOR EVERY INDIAN SKIN.
          </p>
        </div>
        {footerGroups.map((group) => (
          <nav
            className="brand-footer-nav"
            aria-label={`${group.title} footer links`}
            key={group.title}
          >
            <h2>{group.title}</h2>
            {group.links.map((destination: FooterDestination) =>
              destination.href ? (
                <Link key={destination.label} href={destination.href}>
                  {destination.label}
                </Link>
              ) : (
                <span
                  key={destination.label}
                  aria-disabled="true"
                  title={`${destination.label} isn’t available yet.`}
                >
                  {destination.label}
                </span>
              ),
            )}
          </nav>
        ))}
        <div className="brand-footer-newsletter">
          <h2>Stay in the loop.</h2>
          <p>New rituals, ingredient stories and occasional good stuff.</p>
          <div className="newsletter-coming-soon">
            <input
              type="email"
              placeholder="Email"
              aria-label="Email for newsletter — sign-up unavailable"
              aria-describedby="newsletter-availability"
              disabled
            />
            <button
              type="button"
              aria-label="Newsletter sign-up unavailable"
              disabled
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="footer-social-marks" aria-label="Social profiles">
            {socialNames.map((name) => (
              <span
                key={name}
                role="img"
                aria-label={`${name} profile — unavailable`}
                title={`${name} profile isn’t available yet.`}
              >
                <SocialMark name={name} />
              </span>
            ))}
          </div>
          <small id="newsletter-availability">
            Sign-up and social links aren’t available yet.
          </small>
        </div>
      </div>
      <div className="brand-footer-bottom">
        <span>© {new Date().getFullYear()} SKINकारी. All rights reserved.</span>
        <p>
          Real Ingredients.
          <br />A Brighter Tomorrow.
        </p>
      </div>
      <Image
        className="footer-foliage footer-foliage-left"
        src="/images/reference/leaf-cluster.webp"
        alt=""
        aria-hidden="true"
        width={1200}
        height={1075}
        sizes="(max-width: 600px) 110px, 17vw"
      />
      <Image
        className="footer-foliage footer-foliage-right"
        src="/images/reference/leaf-cluster.webp"
        alt=""
        aria-hidden="true"
        width={1200}
        height={1075}
        sizes="(max-width: 600px) 110px, 17vw"
      />
    </footer>
  );
}
