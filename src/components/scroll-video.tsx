"use client";

import React, { useEffect, useRef } from "react";

/**
 * Scroll-driven background video using an FFmpeg All-Intra encoded MP4.
 *
 * All-Intra encoding (-g 1) ensures every single video frame is an I-frame,
 * allowing instantaneous 60fps seek/scrub performance on scroll with zero lag.
 *
 * FFmpeg Command:
 *   ffmpeg -i public/background.mp4 -an -c:v libx264 -g 1 -keyint_min 1 \
 *     -crf 22 -preset medium -pix_fmt yuv420p -movflags +faststart \
 *     public/background-scroll.mp4
 */
const SCROLL_VIDEO_SRC = "/background-scroll.mp4";
const FALLBACK_VIDEO_SRC = "/background.mp4";
const POSTER_SRC = "/splash-poster.webp";

/** Share of the page across which video scrubbing spans */
const SCROLL_SPAN = 0.85;

/** Easing factor for responsive and fluid scroll tracking */
const EASING = 0.28;

export const ScrollVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    let targetTime = 0;
    let smoothTime = 0;
    let rafId = 0;
    let isSeeking = false;
    let pendingTime: number | null = null;
    let lastSeekTime = -1;

    const performSeek = (time: number) => {
      if (!video.duration || isNaN(video.duration) || video.readyState < 2) {
        pendingTime = time;
        return;
      }

      const target = Math.max(0, Math.min(video.duration - 0.01, time));

      // Avoid re-seeking for sub-frame micro deltas
      if (Math.abs(target - lastSeekTime) < 0.02) {
        return;
      }

      if (isSeeking) {
        pendingTime = target;
        return;
      }

      isSeeking = true;
      lastSeekTime = target;

      try {
        if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
          (video as any).fastSeek(target);
        } else {
          video.currentTime = target;
        }
      } catch {
        video.currentTime = target;
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const next = pendingTime;
        pendingTime = null;
        performSeek(next);
      }
    };

    const scrollProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      const raw = window.scrollY / (scrollable * SCROLL_SPAN);
      return Math.min(1, Math.max(0, raw));
    };

    const tick = () => {
      const diff = targetTime - smoothTime;
      if (Math.abs(diff) > 0.015) {
        smoothTime += diff * EASING;
        performSeek(smoothTime);
        rafId = requestAnimationFrame(tick);
      } else {
        smoothTime = targetTime;
        performSeek(smoothTime);
        rafId = 0;
      }
    };

    const handleScroll = () => {
      if (!video.duration || isNaN(video.duration)) return;
      targetTime = scrollProgress() * video.duration;
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleLoadedMetadata = () => {
      smoothTime = 0;
      handleScroll();
    };

    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    if (video.readyState >= 1) {
      handleScroll();
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#fbfbfa]"
    >
      <video
        ref={videoRef}
        poster={POSTER_SRC}
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        disablePictureInPicture
        className="w-full h-full object-cover mix-blend-multiply opacity-95"
      >
        <source src={SCROLL_VIDEO_SRC} type="video/mp4" />
        <source src={FALLBACK_VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
};
