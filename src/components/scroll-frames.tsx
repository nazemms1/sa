"use client";

import React, { useEffect, useRef } from "react";

/**
 * Scroll-driven background.
 *
 * A <video> cannot be relied on here: iOS ignores `preload` on cellular, will
 * not paint a paused element it has never played, and blocks playback outright
 * in Low Power Mode — which is why the clip never appeared on phones. Plain
 * images have none of those rules attached, so the clip ships as a WebP frame
 * sequence drawn into a canvas. It is also a third of the size of the video:
 * 82 frames, 377 KB in total.
 *
 *   ffmpeg -i public/background.mp4 -vf "fps=18,scale=720:1280:flags=lanczos" \
 *     -c:v libwebp -quality 82 -compression_level 5 public/bg/f%03d.webp
 *
 * Total frames: 164 frames (18 fps over 9.1s) for ultra-smooth scrolling.
 */
const FRAME_COUNT = 164;

/** Frames are spread over this share of the page; the rest holds the last one. */
const SCROLL_SPAN = 0.82;

/** How quickly the drawn frame catches up with the scroll position. */
const EASING = 0.18;

/** Parallel image requests — enough to fill quickly, few enough to stay polite. */
const CONCURRENCY = 8;

const framePath = (index: number) =>
  `/bg/f${String(index + 1).padStart(3, "0")}.webp`;

export const ScrollFrames: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !context) return;

    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    const ready: boolean[] = new Array(FRAME_COUNT).fill(false);

    let disposed = false;
    let frame = 0;
    let target = 0;
    let current = 0;
    let painted = -1;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // --- drawing ----------------------------------------------------------
    /** Nearest frame that has actually arrived, so early scrolls still paint. */
    const nearestReady = (index: number) => {
      for (let step = 0; step < FRAME_COUNT; step++) {
        if (ready[index - step]) return index - step;
        if (ready[index + step]) return index + step;
      }
      return -1;
    };

    const paint = (force = false) => {
      const index = nearestReady(Math.round(current));
      if (index < 0 || (index === painted && !force)) return;
      const image = images[index];
      if (!image) return;

      const { width, height } = canvas;
      // Cover fit: fill the viewport, keep the aspect ratio, stay centred.
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight
      );
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      context.fillStyle = "#fbfbfa";
      context.fillRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
      painted = index;
    };

    const resize = () => {
      // Measure the element itself, not the window: on mobile the window can
      // still report 0 while the first layout is in flight, and that would
      // leave the canvas with a 0x0 backing store and nothing ever drawn.
      const rect = canvas.getBoundingClientRect();
      // Cap the backing store at 2x: a third device pixel ratio buys nothing
      // on a soft background and costs real fill rate on phones.
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(rect.width * ratio);
      const height = Math.round(rect.height * ratio);
      if (!width || !height) return;
      if (width === canvas.width && height === canvas.height) return;

      canvas.width = width;
      canvas.height = height;
      paint(true);
    };

    // --- scroll -----------------------------------------------------------
    const scrollProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      const raw = window.scrollY / (scrollable * SCROLL_SPAN);
      return Math.min(1, Math.max(0, raw));
    };

    const tick = () => {
      const delta = target - current;
      if (Math.abs(delta) < 0.35) {
        current = target;
        paint();
        frame = 0; // settled — stop until the next scroll
        return;
      }
      current += delta * EASING;
      paint();
      frame = requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      target = scrollProgress() * (FRAME_COUNT - 1);
      if (reducedMotion.matches) {
        current = target;
        paint();
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // --- loading ----------------------------------------------------------
    let cursor = 0;
    let inFlight = 0;

    const pump = () => {
      while (!disposed && inFlight < CONCURRENCY && cursor < FRAME_COUNT) {
        const index = cursor++;
        const image = new Image();
        image.decoding = "async";
        // Never compete with the content for bandwidth.
        image.fetchPriority = "low";
        image.onload = () => {
          inFlight--;
          ready[index] = true;
          paint();
          pump();
        };
        image.onerror = () => {
          inFlight--;
          pump();
        };
        image.src = framePath(index);
        images[index] = image;
      }
    };

    resize();
    handleScroll();
    pump();

    // Fires on first observation too, so the canvas is sized even if the
    // measurement above ran before layout settled.
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resize);
    // Phones report the new size a beat after the rotation event.
    const handleOrientation = () => setTimeout(resize, 150);
    window.addEventListener("orientationchange", handleOrientation);
    // A tab restored from the background can come back with a size it never
    // had while hidden; re-measure rather than trust the last one.
    const handleVisibility = () => {
      if (!document.hidden) {
        resize();
        handleScroll();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", handleOrientation);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#fbfbfa]"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
