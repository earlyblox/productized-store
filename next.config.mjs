import "./src/env.mjs"

import withBundleAnalyzer from "@next/bundle-analyzer"
import { withAxiom } from "next-axiom"
import withPlugins from "next-compose-plugins"

import { env } from "./src/env.mjs"

const plugins = [
  [withBundleAnalyzer, { enabled: process.env.ANALYZE === "true" }],
  [withAxiom],
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: `${env.NEXT_PUBLIC_POSTHOG_HOST}/:path*`,
      },
    ]
  },
}

export default withPlugins(plugins, nextConfig)
