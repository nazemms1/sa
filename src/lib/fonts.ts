import { Tajawal, Outfit } from "next/font/google";

/** Self-hosted at build time: no render-blocking request to Google Fonts. */
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});
