import React from "react";

/**
 * The plane from the company's own logo animation (public/background.mp4).
 *
 * The silhouette is traced from the final frame of that clip — two shapes,
 * the body and the detached far wing — so the header carries the exact same
 * aircraft as the intro video, and its take-off along the gold swoosh repeats
 * the movement it makes there. Vector rather than a video crop: crisp at any
 * size, recolourable through `currentColor`, and no extra decoding in the nav.
 *
 * Motion lives in globals.css (.brand-plane__*) and is disabled for visitors
 * who ask for reduced motion.
 */
const PLANE_BODY =
  "M56.94 5.18Q57.41 4.71 59.77 4.71Q62.12 4.71 63.06 6.12Q64 7.53 63.06 9.89Q62.12 12.24 55.53 18.83Q48.94 25.41 48 32Q47.06 38.59 47.06 45.18Q47.06 51.76 46.12 53.65Q45.18 55.53 43.3 57.41Q41.41 59.29 40.47 58.82Q39.53 58.35 39.06 52.71Q38.59 47.06 37.17 41.41Q35.76 35.76 33.41 36.71Q31.06 37.65 27.77 40.47Q24.47 43.29 19.77 45.18Q15.06 47.06 10.83 45.65Q6.59 44.24 3.76 42.36Q0.94 40.47 0.47 39.06Q0 37.65 1.88 36.71Q3.76 35.76 4.71 36.24Q5.65 36.71 11.3 36.24Q16.94 35.76 30.59 24Q44.24 12.24 47.53 9.89Q50.82 7.53 53.65 6.59Q56.47 5.65 56.94 5.18Z";

const PLANE_WING =
  "M17.41 17.41Q17.88 16.94 18.35 17.41Q18.82 17.88 25.88 17.88Q32.94 17.88 32.94 18.35Q32.94 18.82 29.17 22.12Q25.41 25.41 23.06 25.88Q20.71 26.35 15.53 24Q10.35 21.65 12.24 19.77Q14.12 17.88 15.53 17.88Q16.94 17.88 17.41 17.41Z";

interface BrandPlaneProps {
  /** Sizing / positioning / text colour of the plane itself. */
  className?: string;
  /** Colour of the swoosh the plane climbs along. */
  trailColor?: string;
}

export const BrandPlane: React.FC<BrandPlaneProps> = ({
  className = "",
  trailColor = "#c5a059",
}) => (
  <svg
    viewBox="0 0 120 72"
    fill="none"
    aria-hidden="true"
    className={`brand-plane ${className}`}
  >
    {/* Gold swoosh, drawn as the plane climbs it */}
    <path
      d="M6 62C24 58 46 48 66 30"
      stroke={trailColor}
      strokeWidth="2.6"
      strokeLinecap="round"
      className="brand-plane__trail"
    />

    {/* Placement of the traced artwork; the inner group carries the motion,
        so its translate values are in this scaled space (1 unit = 0.6 px). */}
    <g transform="translate(64 2) scale(0.6)">
      <g className="brand-plane__craft">
        <path d={PLANE_BODY} fill="currentColor" />
        <path d={PLANE_WING} fill="currentColor" />
      </g>
    </g>
  </svg>
);
