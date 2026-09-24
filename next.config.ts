import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No static export: /api/customs-lookup runs per request, so the app is
  // built for the Cloudflare Worker runtime through @opennextjs/cloudflare.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
