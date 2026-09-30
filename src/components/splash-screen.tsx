"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";

/** Kept in sync with the inline script in app/layout.tsx. */
export const SPLASH_SESSION_KEY = "sa_logistics_splash_seen";

/**
 * The splash clip displays the final ~4 seconds of the logo animation (where
 * the ship, airplane, and brand lockup are revealed).
 *
 * FFmpeg command to export the last 4 seconds cleanly:
 *   ffmpeg -sseof -4 -i public/background.mp4 -an -c:v libx264 \
 *     -preset veryslow -crf 22 -pix_fmt yuv420p -movflags +faststart \
 *     public/background-splash.mp4
 */
const SPLASH_VIDEO_SRC = "/background-splash.mp4";

/** Final frame of the clip: what a phone shows when playback is refused. */
const SPLASH_POSTER_SRC = "/splash-poster.webp";

/** Duration of the clip to show: final 4.0s */
const SPLASH_SHOW_SECONDS = 4.0;

/** Normal 1x playback for natural presentation of the 4-second ending */
const PLAYBACK_RATE = 1.0;

/** Stall watchdog timeout */
const STALL_MS = 4000;

/** Absolute ceiling */
const SPLASH_MAX_MS = 5500;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Thin gold corner bracket used at the four corners of the stage. */
const Corner: React.FC<{ className: string; delay: number }> = ({
  className,
  delay,
}) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    className={`absolute w-14 h-14 sm:w-20 sm:h-20 border-[#c5a059]/45 pointer-events-none ${className}`}
  />
);

/**
 * Full screen intro shown once per browser session.
 *
 * Displays the last 4 seconds of the company's logo animation (ship & airplane reveal).
 */
export const SplashScreen: React.FC = () => {
  const { content, isRtl } = useLanguage();
  const [open, setOpen] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    } catch {
      /* Private mode / storage disabled — the intro simply shows again. */
    }
    // Releases the scroll lock while the fade-out animation is still running.
    document.documentElement.setAttribute("data-splash", "leaving");
    setOpen(false);
  }, []);

  /** Restarted on every frame the video reports; see STALL_MS. */
  const stallTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const armStallWatchdog = useCallback(() => {
    clearTimeout(stallTimer.current);
    stallTimer.current = setTimeout(dismiss, STALL_MS);
  }, [dismiss]);

  /** Real playback position, so the bar tracks smoothly through the final 4 seconds */
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    const bar = progressRef.current;
    armStallWatchdog();
    if (!video || !bar || !video.duration) return;

    // If source video has full 9s length, calculate progress over the last 4 seconds
    const startSec = video.duration > 4.8 ? video.duration - SPLASH_SHOW_SECONDS : 0;
    const durSec = video.duration > 4.8 ? SPLASH_SHOW_SECONDS : video.duration;
    const current = Math.max(0, video.currentTime - startSec);
    const progressPercent = Math.min(100, Math.max(0, (current / durSec) * 100));
    bar.style.width = `${progressPercent}%`;
  }, [armStallWatchdog]);

  const seekToEndSegment = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    // If the video is longer than 4.8s, seek straight to the last 4 seconds
    if (video.duration && video.duration > 4.8) {
      const targetTime = Math.max(0, video.duration - SPLASH_SHOW_SECONDS);
      if (video.currentTime < targetTime) {
        video.currentTime = targetTime;
      }
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen) {
      // Re-applied here because React clears <html> attributes on the dev remount.
      document.documentElement.setAttribute("data-splash", "hidden");
      setOpen(false);
      return;
    }

    const video = videoRef.current;
    if (video) {
      // Direct DOM attributes essential for iOS WebKit autoplay policy
      video.defaultMuted = true;
      video.muted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("autoplay", "");
    }

    const start = () => {
      if (!video) return;
      video.defaultMuted = true;
      video.muted = true;
      seekToEndSegment();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            try {
              video.playbackRate = PLAYBACK_RATE;
              seekToEndSegment();
            } catch (_) {}
          })
          .catch(() => {
            /* iOS Low Power Mode: waiting for first user touch */
          });
      }
    };

    start();

    // Touch events for iOS Safari user gesture unlock if Low Power Mode was active
    const handleGesture = () => {
      start();
    };

    window.addEventListener("touchstart", handleGesture, { once: true, passive: true });
    window.addEventListener("pointerdown", handleGesture, { once: true });
    window.addEventListener("pointerup", handleGesture, { once: true });
    window.addEventListener("click", handleGesture, { once: true });

    armStallWatchdog();
    const ceiling = setTimeout(dismiss, SPLASH_MAX_MS);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") dismiss();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      clearTimeout(ceiling);
      clearTimeout(stallTimer.current);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("pointerup", handleGesture);
      window.removeEventListener("click", handleGesture);
    };
  }, [dismiss, armStallWatchdog]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.setAttribute("data-splash", "hidden");
      }}
    >
      {open && (
        <motion.div
          id="splash-screen"
          role="status"
          aria-live="polite"
          aria-label={content.splash.loadingLabel}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
          transition={{ duration: 0.85, ease: EASE_OUT }}
          className="fixed inset-0 z-[100] overflow-hidden isolate bg-white"
        >
          {/* ---- Stage ------------------------------------------------- */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7f9fc] to-[#e9eef5]" />
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.22]" />
          <div className="absolute -top-44 right-[16%] w-[620px] h-[620px] rounded-full bg-amber-200/35 blur-3xl animate-pulse-glow pointer-events-none" />
          <div className="absolute -bottom-52 left-[10%] w-[560px] h-[560px] rounded-full bg-sky-200/35 blur-3xl animate-pulse-glow pointer-events-none" />
          {/* Vignette keeps the eye on the lockup */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(15,42,74,0.13)_100%)] pointer-events-none" />

          <Corner className="top-6 left-6 border-t border-l rounded-tl-2xl" delay={0.25} />
          <Corner className="top-6 right-6 border-t border-r rounded-tr-2xl" delay={0.35} />
          <Corner className="bottom-6 left-6 border-b border-l rounded-bl-2xl" delay={0.45} />
          <Corner className="bottom-6 right-6 border-b border-r rounded-br-2xl" delay={0.55} />

          {/* ---- Logo animation ---------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            {/* Full bleed. `multiply` drops the clip's white ground, so there is
                no video box on screen — only the navy and gold artwork over the
                stage. Landscape screens crop the tall frame to fill it; portrait
                ones contain it, which still reaches both edges and keeps the
                lockup from being clipped at the sides. */}
            <video
              ref={videoRef}
              src={SPLASH_VIDEO_SRC}
              poster={SPLASH_POSTER_SRC}
              autoPlay
              muted
              playsInline
              webkit-playsinline="true"
              controls={false}
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              onEnded={dismiss}
              onTimeUpdate={handleTimeUpdate}
              className="absolute inset-0 w-full h-full object-contain sm:object-cover mix-blend-multiply"
            />
          </motion.div>

          {/* ---- Caption & progress ------------------------------------ */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-5 px-6 pb-12 sm:pb-14 text-center safe-bottom">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
              className="h-px w-40 sm:w-64 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: EASE_OUT }}
              className="text-[11px] sm:text-sm font-extrabold text-[#0f2a4a] tracking-wide"
            >
              {content.splash.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center gap-2.5"
            >
              <div className="h-[3px] w-44 sm:w-60 rounded-full bg-slate-200/90 overflow-hidden">
                <div
                  ref={progressRef}
                  style={{ width: "0%" }}
                  className="h-full w-0 rounded-full bg-gradient-to-r from-[#0f2a4a] via-[#1e40af] to-[#c5a059] transition-[width] duration-200 ease-linear"
                />
              </div>

              <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                {content.splash.loadingLabel}
              </span>
            </motion.div>
          </div>

          {/* ---- Skip -------------------------------------------------- */}
          <motion.button
            type="button"
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{ top: "max(1.75rem, env(safe-area-inset-top, 0px))" }}
            className={`absolute z-10 px-4 py-2.5 rounded-full text-[11px] font-extrabold text-slate-500 bg-white/70 border border-slate-200/90 backdrop-blur-sm hover:text-[#0f2a4a] hover:border-[#c5a059]/70 hover:bg-white transition-all shadow-sm ${
              isRtl ? "left-5 sm:left-7" : "right-5 sm:right-7"
            }`}
          >
            {content.splash.skipBtn}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
