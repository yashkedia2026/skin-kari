export type ArtKind =
  | "sun"
  | "strong-sun"
  | "water"
  | "humidity"
  | "leaf"
  | "aloe"
  | "charcoal"
  | "citrus"
  | "orange-fruit"
  | "peptides"
  | "collagen"
  | "sparkles"
  | "cloud";

function WaterDrop() {
  return (
    <>
      <path
        d="M50 5C41 22 21 45 21 64a29 29 0 0 0 58 0C79 45 59 22 50 5Z"
        fill="#078fe5"
        stroke="#0074bd"
        strokeWidth="1.2"
      />
      <path
        d="M50 9C43 34 29 48 29 65c0 13 7 22 19 27-15-1-25-13-25-28 0-17 18-40 27-55Z"
        fill="#45c9fa"
      />
      <path
        d="M52 19c10 20 22 33 22 47 0 11-7 19-16 23 7-13 8-25 4-39L52 19Z"
        fill="#0080cf"
      />
      <path
        d="M39 37c-6 11-13 20-11 32 1 6 3 10 7 13-3-10-2-21 2-30l5-12c1-4-1-6-3-3Z"
        fill="#d7f7ff"
      />
      <path
        d="M38 85c5 5 12 7 18 4"
        stroke="#8de1ff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </>
  );
}

function OrangeSlice() {
  return (
    <>
      <circle
        cx="50"
        cy="50"
        r="41"
        fill="#ff9f0b"
        stroke="#3d3424"
        strokeWidth="1.7"
      />
      <circle cx="50" cy="50" r="36.5" fill="#fff6d5" />
      <circle cx="50" cy="50" r="33.8" fill="#ff9213" />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 40} 50 50)`}>
          <path d="M50 18v32" stroke="#fff6d5" strokeWidth="1.8" />
          <path
            d="m53 21 5 19M57 20l5 13"
            stroke="#ffb63e"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </g>
      ))}
      <circle cx="50" cy="50" r="3.2" fill="#fff6d5" />
      <path
        d="M24 28a34 34 0 0 1 34-10"
        stroke="#ffce5b"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  );
}

function CoalCube({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="m0 10 20-10 21 10-21 11Z" fill="#252a29" />
      <path d="m0 10 20 11v22L0 33Z" fill="#161918" />
      <path d="m20 21 21-11v23L20 43Z" fill="#080b0a" />
      <path
        d="m0 10 20 11 21-11"
        fill="none"
        stroke="#343937"
        strokeWidth=".9"
      />
    </g>
  );
}

export function IngredientArt({
  kind,
  className = "",
}: {
  kind: ArtKind;
  className?: string;
}) {
  return (
    <svg
      className={`ingredient-art ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {(kind === "sun" || kind === "strong-sun") && (
        <g
          stroke="#ed7b32"
          strokeWidth={kind === "sun" ? "2.5" : "3"}
          strokeLinecap="round"
        >
          <circle
            cx="50"
            cy="50"
            r="25"
            fill={kind === "strong-sun" ? "#ffd82f" : "none"}
          />
          {kind === "strong-sun" && (
            <circle cx="47" cy="46" r="19" fill="#ffdf48" stroke="none" />
          )}
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M50 7v10" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </g>
      )}
      {kind === "water" && <WaterDrop />}
      {kind === "humidity" && (
        <>
          <g transform="translate(30 0) scale(.36)">
            <WaterDrop />
          </g>
          <g transform="translate(0 30) scale(.57)">
            <WaterDrop />
          </g>
          <g transform="translate(55 35) scale(.4)">
            <WaterDrop />
          </g>
        </>
      )}
      {kind === "leaf" && (
        <>
          <path d="M17 81C5 49 31 17 85 7 81 48 62 81 17 81Z" fill="#006547" />
          <path d="M17 81C14 51 38 21 85 7L17 81Z" fill="#007b51" />
          <path d="M17 81 85 7C74 38 52 65 17 81Z" fill="#00573d" />
          <path d="m17 81 35-42-9 35Z" fill="#076c4a" />
          <path d="M18 77 51 21 40 52Z" fill="#0b855b" />
          <path
            d="M9 94 63 31"
            stroke="#378d68"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="m32 67 29-10M43 54l-2-24M50 46l21-8"
            stroke="#23805a"
            strokeWidth=".8"
            opacity=".65"
          />
        </>
      )}
      {kind === "aloe" && (
        <>
          <path d="M49 91C32 87 15 68 2 48c22 2 37 12 49 31Z" fill="#087c52" />
          <path
            d="M50 90C31 72 24 44 19 17c20 13 30 37 36 64Z"
            fill="#00864f"
          />
          <path d="M50 88C38 62 42 27 50 2c13 30 15 57 8 82Z" fill="#008957" />
          <path d="M51 88c1-33 15-57 32-70-3 27-12 53-28 72Z" fill="#007347" />
          <path d="M53 90c8-24 23-36 45-42-9 23-25 39-45 42Z" fill="#06794d" />
          <path
            d="M49 92C34 80 27 61 28 36c17 18 25 35 25 54Z"
            fill="#049d61"
          />
          <path d="M51 92c-4-24 4-44 18-62 1 25-4 45-14 62Z" fill="#006541" />
          <path d="M50 88V3c8 27 10 55 0 85Z" fill="#006b46" />
          <path
            d="M50 90 20 19c15 19 24 40 30 71ZM50 90l32-72c-6 25-15 51-32 72Z"
            fill="#005f40"
            opacity=".65"
          />
          <path d="M50 92 29 39c12 16 19 31 21 53Z" fill="#24a86c" />
          <path d="M51 92 68 33c-1 23-6 43-17 59Z" fill="#00804d" />
        </>
      )}
      {kind === "charcoal" && (
        <g transform="translate(0 2)">
          <CoalCube x={30} y={30} />
          <CoalCube x={7} y={45} />
          <CoalCube x={51} y={46} />
          <CoalCube x={29} y={10} />
        </g>
      )}
      {kind === "citrus" && <OrangeSlice />}
      {kind === "orange-fruit" && (
        <>
          <path
            d="M33 30c-7-12-9-19-5-25"
            stroke="#28733e"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path d="M32 23C17 26 8 18 6 10c15-4 27 1 26 13Z" fill="#00734c" />
          <path d="M7 11c13 1 18 5 25 12" stroke="#0e8d55" strokeWidth="1" />
          <path
            d="M35 28c-19-5-31 10-31 29 0 22 14 34 32 34s31-13 31-35c0-20-13-32-32-28Z"
            fill="#ff980b"
          />
          <path
            d="M30 30C13 30 8 43 9 59c1 17 8 26 20 29C11 82 15 44 30 30Z"
            fill="#ffb52b"
          />
          <path
            d="M38 30c18 5 21 23 16 39-3 11-9 17-18 21 18-1 29-15 29-35 0-15-10-27-27-25Z"
            fill="#f88005"
          />
          <g transform="translate(37 32) scale(.62)">
            <OrangeSlice />
          </g>
        </>
      )}
      {kind === "peptides" && (
        <g stroke="#e62d8b" strokeWidth="3.5" strokeLinecap="round">
          <path d="m26 32 29 17 17-32M55 49 29 77m26-28 27 28" />
          {[
            [26, 32, 7],
            [55, 49, 10],
            [72, 17, 10],
            [29, 77, 9],
            [82, 77, 10],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#faf8f1" />
          ))}
          <path
            d="M19 33c0-4 3-7 7-7M64 18c0-5 3-8 8-8M74 78c0-5 3-8 8-8"
            stroke="#f87cb6"
            strokeWidth="1.3"
          />
        </g>
      )}
      {kind === "collagen" && (
        <g
          transform="rotate(35 50 50)"
          stroke="#e61982"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M35 8C35 30 65 30 65 50S35 70 35 92M65 8C65 30 35 30 35 50S65 70 65 92" />
          <path
            d="M37 19h26M45 30h10M39 40h22M36 51h28M40 62h20M45 73h10M37 83h26"
            strokeWidth="3.8"
          />
        </g>
      )}
      {kind === "sparkles" && (
        <g fill="#e91c87">
          <path d="M49 9c3 20 10 27 25 30-15 4-22 11-25 31-4-20-10-27-26-31C39 36 45 29 49 9ZM80 26c2 13 6 18 16 20-10 3-14 7-16 20-3-13-7-17-17-20 10-2 14-7 17-20ZM21 40c3 17 8 22 21 25-13 3-18 9-21 26-3-17-9-23-21-26 12-3 18-8 21-25Z" />
        </g>
      )}
      {kind === "cloud" && (
        <>
          <path
            d="M18 76C7 76 3 69 5 60c1-7 6-11 13-12-2-10 6-21 17-20 4-9 17-13 27-7 7 4 9 9 10 16 11-2 20 5 20 15 9 7 8 20-1 25-11 6-22 0-31 2-15 5-26-1-42-3Z"
            fill="#c5c5c3"
          />
          <path
            d="M15 54c-7 3-8 11-4 16 7 8 14-1 23 2 9 4 19 4 27 2 9-3 20 3 28-3 8-6 5-16-1-18-2 8-11 12-19 8-7-5-18-8-27-5-10 5-18 0-27-2Z"
            fill="#b6b6b4"
          />
          <path
            d="M22 45c1-11 11-15 18-12 7-11 23-9 27 2-11-7-21-4-25 4-9-4-15-1-20 6Z"
            fill="#d5d5d3"
          />
          <path
            d="M17 67c10-2 13 4 21 3M49 65c8-4 14-2 21 1"
            stroke="#c1c1bf"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
