import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "S.A. LOGISTICS",
    short_name: "S.A. LOGISTICS",
    description: "International freight & customs clearance to Syria",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0f2a4a",
    lang: "ar",
    dir: "rtl",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
