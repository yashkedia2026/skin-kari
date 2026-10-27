import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Frequently Asked Questions",
  "How to use a SKINKARI sheet mask, how long to leave it on, pack contents and answers about the collection.",
  "/faqs",
);

const questions = [
  {
    question: "How do I use a SKINKARI sheet mask?",
    answer:
      "Apply the mask to a freshly cleansed face. Keep it on for 15 minutes, then remove it gently. Pat the excess serum onto your face and neck. These three directions appear on all four mask packs.",
  },
  {
    question: "What comes in each pack?",
    answer:
      "Each pack is labelled 1 sheet mask, 20 ml. The same format is shown on the Vitamin C Radiance, Hyaluronic Acid, Collagen & Peptide and Detan packaging.",
  },
  {
    question: "How long should I leave my mask on?",
    answer:
      "The directions specify 15 minutes before gently removing the mask. They then say to pat the excess serum onto your face and neck.",
  },
  {
    question: "How often should I use a mask?",
    answer:
      "The supplied packaging does not give a recommended frequency. We haven’t added a daily or weekly routine recommendation.",
  },
  {
    question: "Where can I find the full ingredient list?",
    answer:
      "Our ingredient page shows only the featured names printed on the front of each pack. The full ingredient-list area in the supplied artwork is blank. A complete, confirmed list is still needed for each product.",
  },
  {
    question: "What should I know before using one?",
    answer:
      "Follow the warnings on the pack: for external use only; avoid the eyes, wounds and damaged skin; keep out of reach of children; use immediately after opening; and stop use if irritation or rash appears. The pack also advises consulting a specialist for symptoms such as red spots, swelling or itching during or after use, including after direct sunlight exposure.",
  },
  {
    question: "How should I store my mask?",
    answer:
      "The packaging says to store it in a cool, dry place, away from direct sunlight, and to use it immediately after opening.",
  },
  {
    question: "What does demo mode mean?",
    answer:
      "You can explore the collection and add, remove or update items in a demo bag. Prices and stock have not been supplied for this mode. Demo checkout is disabled, and no payment or order is created.",
  },
  {
    question: "What are the shipping and returns details?",
    answer:
      "Delivery areas, charges, timelines and returns terms are awaiting confirmation by the merchant. Visit Shipping & Returns for the latest published information.",
  },
];

export default function FAQsPage() {
  return (
    <article className="editorial-page">
      <p className="page-eyebrow">A little clarity</p>
      <h1 className="page-title">
        Good questions.
        <br />
        <em>Straight answers.</em>
      </h1>
      <p className="page-intro">
        The small details, from your first fifteen minutes to what’s inside the
        pack.
      </p>
      <div className="prose faq-list">
        {questions.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <div className="info-grid">
        <section className="info-card">
          <h2>Meet the ingredients</h2>
          <p>See the featured names on each of our four masks.</p>
          <Link className="text-link" href="/ingredients">
            Explore ingredients <span aria-hidden="true">↗</span>
          </Link>
        </section>
        <section className="info-card">
          <h2>The delivery details</h2>
          <p>Check the status of our shipping and returns information.</p>
          <Link className="text-link" href="/shipping-returns">
            Shipping &amp; returns <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
    </article>
  );
}
