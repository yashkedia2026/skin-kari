import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { articles } from "./_articles";

export const metadata = pageMetadata(
  "The SKINKARI Journal",
  "Small rituals and a closer look at your skincare. Read the SKINKARI journal for sheet-mask directions and a guide to your pack.",
  "/journal",
);

export default function JournalPage() {
  return (
    <section className="editorial-page">
      <p className="page-eyebrow">The SKINKARI journal</p>
      <h1 className="page-title">
        A little reading.
        <br />
        <em>A brighter break.</em>
      </h1>
      <p className="page-intro">
        Room for small rituals, curious questions, and getting to know what’s on
        your shelf.
      </p>
      <div className="info-grid">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="info-card journal-card"
            style={{ background: article.color }}
          >
            <p className="page-eyebrow">
              {article.number} / {article.category}
            </p>
            <h2>
              <Link href={`/journal/${article.slug}`}>{article.title}</Link>
            </h2>
            <p>{article.description}</p>
            <Link className="text-link" href={`/journal/${article.slug}`}>
              Take a moment <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
