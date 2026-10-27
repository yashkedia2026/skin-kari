import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Privacy Policy",
    "Privacy information for the SKINKARI storefront preview. The merchant privacy policy is pending.",
    "/privacy",
  ),
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="editorial-page">
      <p className="page-eyebrow">Your information</p>
      <h1 className="page-title">
        A little clarity
        <br />
        <em>on privacy.</em>
      </h1>
      <p className="page-intro">
        The merchant’s full privacy policy is awaiting approval. The notes below
        explain the storefront preview and are not a completed privacy policy.
      </p>
      <div className="prose">
        <h2>Your shopping bag</h2>
        <p>
          The storefront uses a necessary cookie to remember your shopping bag.
          In demo mode, this holds the items you selected. When the store is
          connected to Shopify, a cookie identifies your Shopify cart.
        </p>
        <h2>Checkout</h2>
        <p>
          Live checkout, when enabled, takes place on Shopify. This storefront
          does not provide its own payment form or collect card details. Demo
          mode does not accept payment.
        </p>
        <h2>Information still to be published</h2>
        <p>
          The merchant must confirm its legal identity, privacy contact, data
          handling purposes, service providers, retention periods, applicable
          rights and request process, and any analytics or marketing
          technologies used by the deployed store.
        </p>
        <p>
          Additional services installed for launch may change how information is
          handled. The final policy must reflect the deployed store.
        </p>
        <Link className="text-link" href="/contact">
          Customer care information{" "}
          <ArrowUpRight
            className="inline-arrow"
            aria-hidden="true"
            focusable="false"
          />
        </Link>
      </div>
    </article>
  );
}
