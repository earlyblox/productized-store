import posthog from "posthog-js"

import { env } from "@/env.mjs"

export const ph = posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: `${env.NEXT_PUBLIC_VERCEL_URL}/ingest`,
  ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  capture_pageview: false, // Disable automatic pageview capture, as we capture manually
})
