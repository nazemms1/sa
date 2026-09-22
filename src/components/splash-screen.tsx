"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";

/** Kept in sync with the inline script in app/layout.tsx. */
export const SPLASH_SESSION_KEY = "sa_logistics_splash_seen";

/**
 * The intro plays straight through, so this copy is encoded with a normal GOP
 * instead of the all-intra one scrubbing would need — 228 KB against the
 * 2.95 MB source:
 *
 *   ffmpeg -i public/background.mp4 -an -vf "fps=30" -c:v libx264 \
 *     -preset veryslow -crf 28 -pix_fmt yuv420p -movflags +faststart \
 *     public/background-splash.mp4
 */
const SPLASH_VIDEO_SRC = "/background-splash.mp4";

/** Final frame of the clip: what a phone shows when playback is refused. */
const SPLASH_POSTER_SRC = "/splash-poster.webp";

/** The clip is 9.1s of logo build-up; at this rate it lands around 5.7s. */
const PLAYBACK_RATE = 1.6;

/**
 * If the playhead stops moving for this long the intro is going nowhere —
 * autoplay was refused, the file stalled, or the tab is throttled — so we let
 * the visitor through instead of holding them on a frozen frame.
 */
const STALL_MS = 2500;

/** Absolute ceiling, whatever happens. */
const SPLASH_MAX_MS = 14000;

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
 * The clip in /public is the company's own logo animation drawn on white, so
 * the stage is a light brand gradient and the video is composited with
 * `mix-blend-mode: multiply`: the white ground drops out and only the navy and
 * gold artwork paints over the backdrop — no video box, no hard edges.
 *
 * The component always renders the same markup on the server; repeat visits are
 * hidden before first paint by the inline script + `[data-splash="hidden"]`
 * rule in globals.css, so there is never a flash of the intro.
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

  /** Real playback position, so the bar tells the truth rather than guessing. */
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    const bar = progressRef.current;
    armStallWatchdog();
    if (!video || !bar || !video.duration) return;
    bar.style.width = `${Math.min(100, (video.currentTime / video.duration) * 100)}%`;
  }, [armStallWatchdog]);

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
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage
      // is only readable on the client; the intro is already hidden by CSS at this
      // point, so this render only drops it from the tree.
      setOpen(false);
      return;
    }

    const video = videoRef.current;
    const start = () => {
      if (!video) return;
      video.muted = true;
      video.playbackRate = PLAYBACK_RATE;
      void video.play().catch(() => {
        /* Refused (iOS Low Power Mode, data saver). The poster frame carries
           the brand and the watchdog moves the visitor on. */
      });
    };

    start();
    // A phone that refused autoplay will usually allow it once the visitor has
    // touched the screen; `pointerup` counts as that gesture.
    window.addEventListener("pointerup", start, { once: true });

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
      window.removeEventListener("pointerup", start);
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
