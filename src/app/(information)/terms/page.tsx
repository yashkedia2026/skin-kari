import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Terms & Conditions",
    "Terms and conditions for the SKINKARI storefront are awaiting merchant approval.",
    "/terms",
  ),
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <article className="editorial-page">
      <p className="page-eyebrow">Before you shop</p>
      <h1 className="page-title">
        The small print,
        <br />
        <em>made clear.</em>
      </h1>
      <p className="page-intro">
        The store’s terms and conditions are awaiting merchant approval. This is
        a preview notice, not a complete sales agreement.
      </p>
      <div className="prose">
        <h2>About this preview</h2>
        <p>
          You can explore the collection and try the shopping bag in demo mode.
          A demo bag does not place an order, reserve stock or take a payment.
        </p>
        <h2>Terms before launch</h2>
        <p>
          The merchant must publish its legal identity and contact details,
          order and payment terms, cancellation and returns rules, applicable
          jurisdiction, and other terms that apply to the live store.
        </p>
        <h2>Product information</h2>
        <p>
          The collection information is based on the supplied packaging artwork.
          Read the instructions and warnings on the final product pack before
          use.
        </p>
        <Link className="text-link" href="/shipping-returns">
          Shipping &amp; returns information <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
