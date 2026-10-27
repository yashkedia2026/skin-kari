import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Shipping & Returns",
    "SKINKARI shipping and returns information. Merchant policies are awaiting confirmation.",
    "/shipping-returns",
  ),
  robots: { index: false, follow: true },
};

export default function ShippingReturnsPage() {
  return (
    <article className="editorial-page">
      <p className="page-eyebrow">The details matter</p>
      <h1 className="page-title">
        From our shelf
        <br />
        <em>to yours.</em>
      </h1>
      <p className="page-intro">
        Shipping and returns policies are being finalised. This page will be
        updated with the confirmed details before launch.
      </p>
      <div className="info-grid">
        <section className="info-card">
          <h2>Shipping</h2>
          <p>
            Delivery areas, dispatch times, delivery estimates and shipping
            charges have not yet been confirmed. No delivery-time or
            free-shipping promise is currently offered on this preview.
          </p>
        </section>
        <section className="info-card">
          <h2>Returns &amp; order issues</h2>
          <p>
            Return eligibility, time limits, cancellations, damaged-item support
            and refund timelines are awaiting merchant approval. A support
            contact and the process for raising an issue will be published here.
          </p>
        </section>
      </div>
      <div className="prose">
        <h2>Before placing an order</h2>
        <p>
          Please check the final published policy and the shipping options
          presented at checkout. This preview does not accept payment when
          running in demo mode.
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
