import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"
import { env } from "./env.mjs"

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
  output: process.env.NODE_ENV === 'development' ? undefined : 'export',
  reactStrictMode: true,
  experimental: { instrumentationHook: true },
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/graphql',
          destination: 'http://localhost:3333/graphql',
        },
      ];
    } else {
      return []; // No rewrites in other environments
    }
  },
})

export default config
