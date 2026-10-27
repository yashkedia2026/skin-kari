import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Contact SKINKARI",
    "Contact and customer care information for SKINKARI.",
    "/contact",
  ),
  robots: { index: false, follow: true },
};

export default function ContactPage() {
  return (
    <article className="editorial-page">
      <p className="page-eyebrow">Let’s talk</p>
      <h1 className="page-title">
        Good skincare.
        <br />
        <em>Open conversations.</em>
      </h1>
      <p className="page-intro">
        Our customer care details are getting their finishing touches.
      </p>
      <div className="prose">
        <h2>Customer care</h2>
        <p>
          A verified support email, phone number, business address and customer
          care hours have not been provided yet. They will appear here when
          confirmed by SKINKARI.
        </p>
        <p>
          There is no contact form on this preview. Please do not enter personal
          or order information elsewhere on the site to request support.
        </p>
        <h2>A few answers, while you’re here</h2>
        <p>
          For mask directions, pack sizes and details about the current
          collection, visit our frequently asked questions.
        </p>
      </div>
      <Link className="button" href="/faqs">
        Read the FAQs <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
