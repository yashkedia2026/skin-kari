"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { ProductColor } from "@/data/products";
import type { VideoTestimonial } from "@/data/video-testimonials";
import styles from "./video-testimonials.module.css";

function VideoCard({
  testimonial,
  onPlay,
}: {
  testimonial: VideoTestimonial;
  onPlay: (video: HTMLVideoElement) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const videoId = useId();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    setError(false);
    setStarted(true);
    // Attach media only after an explicit gesture. Keeping play() in that
    // gesture also supports mobile browsers that restrict scripted playback.
    if (!video.getAttribute("src") || video.error) {
      video.src = testimonial.src;
      video.load();
    }
    try {
      await video.play();
    } catch (reason) {
      // Scrolling away or pausing can interrupt a still-pending play request.
      if (!(reason instanceof DOMException && reason.name === "AbortError"))
        setError(true);
    }
  }

  return (
    <article className={styles.card} aria-label={testimonial.title}>
      <div className={styles.media}>
        {!started && (
          /* Native lazy loading defers these video posters without requiring
             remote image hosts to be added to Next's image configuration. */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.poster}
            src={testimonial.poster}
            alt=""
            loading="lazy"
            decoding="async"
            width={600}
            height={800}
          />
        )}
        <video
          ref={videoRef}
          id={videoId}
          className={styles.video}
          aria-label={testimonial.title}
          preload="none"
          crossOrigin="anonymous"
          playsInline
          controls={started}
          onPlay={(event) => {
            setPlaying(true);
            onPlay(event.currentTarget);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setError(true);
          }}
        >
          {started &&
            testimonial.captions?.map((track) => (
              <track key={track.srcLang} kind="captions" {...track} />
            ))}
          Your browser does not support HTML5 video.
        </video>
        {!started && (
          <button
            className={styles.playMark}
            type="button"
            aria-label={`Watch: ${testimonial.title}`}
            aria-controls={videoId}
            onClick={() => {
              playButtonRef.current?.focus();
              void togglePlayback();
            }}
          >
            <Play size={28} fill="currentColor" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className={styles.cardBody}>
        {testimonial.customerName && <h3>{testimonial.customerName}</h3>}
        {testimonial.caption && <p>{testimonial.caption}</p>}
        <button
          ref={playButtonRef}
          type="button"
          className={styles.playButton}
          aria-controls={videoId}
          aria-label={`${playing ? "Pause video" : error ? "Try again" : "Play video"}: ${testimonial.title}`}
          onClick={() => void togglePlayback()}
        >
          {playing ? (
            <Pause size={16} aria-hidden="true" />
          ) : (
            <Play size={16} aria-hidden="true" />
          )}
          {playing ? "Pause video" : error ? "Try again" : "Play video"}
        </button>
        {error && (
          <p className={styles.error} role="status">
            This video couldn’t play. Please try again.
          </p>
        )}
        {testimonial.transcript && (
          <details className={styles.transcript}>
            <summary>Read video transcript</summary>
            <p>{testimonial.transcript}</p>
          </details>
        )}
      </div>
    </article>
  );
}

export function VideoTestimonials({
  videos,
  tone = "orange",
}: {
  videos: readonly VideoTestimonial[];
  tone?: ProductColor;
}) {
  const headingId = useId();
  const carouselId = useId();
  const carouselRef = useRef<HTMLDivElement>(null);
  const approvedVideos = videos.filter((video) => video.approved);

  useEffect(() => {
    const carousel = carouselRef.current;
    const pauseOnHidden = () => {
      if (document.hidden)
        carousel?.querySelectorAll("video").forEach((video) => video.pause());
    };
    document.addEventListener("visibilitychange", pauseOnHidden);
    return () => {
      document.removeEventListener("visibilitychange", pauseOnHidden);
      carousel?.querySelectorAll("video").forEach((video) => video.pause());
    };
  }, [videos]);

  if (!approvedVideos.length) return null;

  function move(direction: number) {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector("article");
    if (!carousel || !card) return;
    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
    carousel.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      className={`section tone-${tone} ${styles.section}`}
      aria-labelledby={headingId}
    >
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">In their own words</p>
          <h2 id={headingId}>Video testimonials</h2>
        </div>
        {approvedVideos.length > 1 && (
          <div
            className={styles.navigation}
            role="group"
            aria-label="Video carousel controls"
          >
            <button
              type="button"
              aria-label="Previous videos"
              aria-controls={carouselId}
              onClick={() => move(-1)}
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next videos"
              aria-controls={carouselId}
              onClick={() => move(1)}
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <div
        ref={carouselRef}
        id={carouselId}
        className={styles.carousel}
        role="region"
        aria-label="Customer testimonial videos"
        tabIndex={0}
      >
        {approvedVideos.map((testimonial) => (
          <VideoCard
            key={`${testimonial.id}:${testimonial.src}`}
            testimonial={testimonial}
            onPlay={(active) => {
              carouselRef.current
                ?.querySelectorAll("video")
                .forEach((video) => {
                  if (video !== active) video.pause();
                });
            }}
          />
        ))}
      </div>
    </section>
  );
}
