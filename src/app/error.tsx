"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="status-page section">
      <p className="eyebrow">A LITTLE PAUSE</p>
      <h1>
        We couldn’t load
        <br />
        the store just now.
      </h1>
      <p>Please try again in a moment. Your bag is saved in this browser.</p>
      <button onClick={reset} className="button">
        Try again ↗
      </button>
    </div>
  );
}
