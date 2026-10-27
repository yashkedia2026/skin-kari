import Link from "next/link";
import { BrandSpark } from "@/components/brand-spark";
export default function NotFound() {
  return (
    <div className="status-page section">
      <span aria-hidden="true">
        <BrandSpark />
      </span>
      <p className="eyebrow">404 · A LITTLE DETOUR</p>
      <h1>
        This page took
        <br />a me-time moment.
      </h1>
      <p>Let’s get you back to the good-skin days.</p>
      <Link href="/shop" className="button">
        Explore the masks ↗
      </Link>
    </div>
  );
}
