// Draw the brand mark instead of relying on a platform's text/emoji font.
export function BrandSpark() {
  return (
    <svg
      className="brand-spark"
      width="1em"
      height="1em"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M50 6v88M6 50h88M19 19l62 62M19 81l62-62" />
    </svg>
  );
}
