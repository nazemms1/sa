import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * The site runs as a Cloudflare Worker rather than a static export, because
 * /api/customs-lookup has to reach hs-exp.net at request time — a prerendered
 * build has nowhere to run that.
 *
 * Build and deploy with `npm run deploy` (opennextjs-cloudflare), not
 * `wrangler deploy` on its own.
 */
export default defineCloudflareConfig();
