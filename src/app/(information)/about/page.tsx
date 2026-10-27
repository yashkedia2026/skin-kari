import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About SKINKARI",
  "Meet SKINKARI: Indian skincare for real life. Five expressive sheet masks and a little room for yourself.",
  "/about",
);

export default function AboutPage() {
  return (
    <article className="editorial-page">
      <p className="page-eyebrow">A little more us</p>
      <h1 className="page-title">
        Real life.
        <br />
        Real skin.
        <br />
        <em>Brighter days.</em>
      </h1>
      <p className="page-intro">
        SKINKARI is Indian skincare for real life. The busy kind. The messy
        kind. The kind that deserves a little colour.
      </p>
      <div className="prose">
        <h2>Same skin. A different kind of moment.</h2>
        <p>
          Our starting point is simple: a sheet mask and a little time that
          belongs to you. There is no perfect routine to perform here. Just a
          small ritual to make your own, following your mask’s directions.
        </p>
        <p>
          Our five masks each have their own personality. Orange brings Vitamin
          C Radiance. Blue is Hyaluronic Acid. Pink introduces Collagen &amp;
          Peptide. Green is Detan. Brightening adds a bio-cellulose sheet mask
          with Vitamin C, niacinamide and licorice. Together, they make a
          colourful little collection for your bathroom shelf.
        </p>
      </div>
      <div className="info-grid">
        <section className="info-card" style={{ background: "#ffe0c4" }}>
          <p className="page-eyebrow">01 / Our outlook</p>
          <h2>More you.</h2>
          <p>
            Our name is SKINKARI. Our thought is right there on the pack: same
            skin, brighter days.
          </p>
        </section>
        <section className="info-card" style={{ background: "#d7ebfa" }}>
          <p className="page-eyebrow">02 / Our ritual</p>
          <h2>Make a little room.</h2>
          <p>
            Vitamin C Radiance, Hyaluronic Acid, Collagen &amp; Peptide and
            Detan share three steps: apply, leave on for fifteen minutes, then
            gently remove and pat in the remaining serum. Brightening Mask’s
            directions are still to come.
          </p>
        </section>
      </div>
      <Link className="button" href="/shop">
        Find your mask <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
