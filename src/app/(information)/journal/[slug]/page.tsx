import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { articles } from "../_articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) return {};
  return pageMetadata(
    article.title,
    article.description,
    `/journal/${article.slug}`,
  );
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) notFound();

  return (
    <article className="editorial-page">
      <Link className="text-link" href="/journal">
        <ArrowLeft
          className="inline-arrow"
          aria-hidden="true"
          focusable="false"
        />{" "}
        Back to the journal
      </Link>
      <p className="page-eyebrow">{article.category}</p>
      <h1 className="page-title">{article.title}</h1>
      <p className="page-intro">{article.description}</p>
      <div className="prose">
        {slug === "your-fifteen-minute-mask-ritual" ? (
          <MaskRitual />
        ) : (
          <ReadingYourPack />
        )}
      </div>
      <Link className="button" href="/shop">
        Explore the masks{" "}
        <ArrowUpRight
          className="inline-arrow"
          aria-hidden="true"
          focusable="false"
        />
      </Link>
    </article>
  );
}

function MaskRitual() {
  return (
    <>
      <p>
        A sheet mask makes a little space in the day. If you’re meeting SKINKARI
        for the first time, there’s no elaborate sequence to memorise. Vitamin C
        Radiance, Hyaluronic Acid, Collagen &amp; Peptide and Detan share the
        three directions below.
      </p>
      <h2>01. Start with a freshly cleansed face.</h2>
      <p>
        The first instruction is to apply the mask to a freshly cleansed face.
        Open the pack when you’re ready to use it: the packaging says to use the
        mask immediately after opening.
      </p>
      <h2>02. Give it fifteen minutes.</h2>
      <p>
        Keep the mask on for 15 minutes, as directed on the pack, then remove it
        gently. Set a timer if it helps you settle into the pause without
        watching the clock.
      </p>
      <h2>03. Pat in the remaining serum.</h2>
      <p>
        The final instruction is to pat the excess serum onto your face and
        neck. That completes the three-step routine printed on the packaging.
      </p>
      <h2>Let the pack lead the way.</h2>
      <p>
        The artwork does not specify how many times a week to use a mask, so
        this is a guide to a single use, not a daily or weekly schedule. Always
        read the final pack’s directions and warnings before use.
      </p>
      <p>
        The supplied warnings say to avoid contact with eyes, not to apply to
        wounds or damaged skin, and to discontinue use if irritation or a rash
        appears. Keep the unopened pack in a cool, dry place, away from direct
        sunlight.
      </p>
      <p>
        These directions come from the supplied Vitamin C Radiance, Hyaluronic
        Acid, Collagen &amp; Peptide and Detan packaging. You can find the
        directions and cautions for those four masks in our{" "}
        <Link href="/faqs">FAQs</Link>.
      </p>
    </>
  );
}

function ReadingYourPack() {
  return (
    <>
      <p>
        Our packs have a lot to say in a little space. A bold colour, the mask’s
        name, a handful of featured ingredients, and the practical details for
        using it. Reading those parts separately can make the whole picture
        clearer.
      </p>
      <h2>Start with the name.</h2>
      <p>
        The orange pack is Vitamin C Radiance Face Mask. Blue is Hyaluronic Acid
        Face Mask. Pink is Collagen &amp; Peptide Face Mask, and green is Detan
        Face Mask. Each of the four packs is labelled as one sheet mask with 20
        ml.
      </p>
      <h2>Featured ingredients are a shortlist.</h2>
      <p>
        The orange pack names vitamin C, niacinamide and licorice extract. The
        blue pack names hyaluronic acid, ceramides, panthenol and aloe vera. On
        pink, you’ll see collagen, peptides and squalane. Green features
        activated charcoal, green tea extract, aloe vera and niacinamide.
      </p>
      <p>
        Those front-of-pack names are highlights. They do not tell you every
        ingredient in the formula, its concentration, or the order of a complete
        ingredient list.
      </p>
      <h2>Look for the complete ingredient list.</h2>
      <p>
        The full ingredient-list area is blank in the four supplied
        front-and-back artworks. Until the complete lists are confirmed, our{" "}
        <Link href="/ingredients">ingredient guide</Link> stays with the
        featured names. If you need to check for a particular ingredient, a
        featured shortlist cannot answer that question.
      </p>
      <h2>Read the practical details too.</h2>
      <p>
        Vitamin C Radiance, Hyaluronic Acid, Collagen &amp; Peptide and Detan
        specify 15 minutes, followed by gentle removal and patting the excess
        serum onto your face and neck. Storage and use warnings are also printed
        on their backs.
      </p>
      <p>
        Read the final product pack before use. The artwork supplied for this
        preview still has unfilled fields for batch, manufacturing and expiry
        information; those details must come from the final labelled product.
      </p>
    </>
  );
}
