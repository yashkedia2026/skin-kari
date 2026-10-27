export type BrandValueKind =
  "leaf-outline" | "flask" | "hands" | "heart" | "sun";

export function BrandValueIcon({
  kind,
  className = "",
}: {
  kind: BrandValueKind;
  className?: string;
}) {
  return (
    <svg
      className={`brand-value-icon ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "leaf-outline" && (
        <>
          <path d="M16 45C7 23 22 11 53 7c-3 29-15 43-37 38Z" />
          <path d="M10 56c7-18 18-27 33-38" />
        </>
      )}
      {kind === "flask" && (
        <>
          <path d="M25 8h14M27 8v19L12 50c-2 4 0 7 5 7h30c5 0 7-3 5-7L37 27V8" />
          <path d="M21 40h22M29 17h6M28 45l7 6M35 45l-7 6" />
        </>
      )}
      {kind === "hands" && (
        <>
          <path d="M32 28 21 18c-9-8 2-18 8-10l3 4 3-4c6-8 17 2 8 10Z" />
          <path d="M25 58V45L12 32l-3-11c-1-5-6-4-6 1l1 16 13 14v6M39 58V45l13-13 3-11c1-5 6-4 6 1l-1 16-13 14v6" />
          <path d="m25 45-10-12c-3-4 1-7 4-4l13 12 13-12c3-3 7 0 4 4L39 45M32 41v17" />
        </>
      )}
      {kind === "heart" && (
        <path d="m32 55-23-24C-6 15 15-3 28 12l4 5 4-5C49-3 70 15 55 31Z" />
      )}
      {kind === "sun" && (
        <>
          <circle cx="32" cy="32" r="16" />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d="M32 2v7"
              transform={`rotate(${i * 30} 32 32)`}
              strokeWidth="2"
            />
          ))}
        </>
      )}
    </svg>
  );
}
