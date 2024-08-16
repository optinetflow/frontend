import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"
import { env } from "./env.mjs"

/**
 * @type {import('next').NextConfig}
 */

const isDevelop = process.env.NODE_ENV === 'development';
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
  output: isDevelop ? undefined : 'export',
  reactStrictMode: true,
  experimental: { instrumentationHook: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vaslkon.com',
        port: '',
        pathname: '/file/optinetflow/asset/**',
      },
    ],
  },
  ...(isDevelop && {
    async rewrites() {
      return [
        {
          source: '/graphql',
          destination: process.env.CODEGEN_GRAPHQL_URI,
        },
      ];
    }
  }),
})

export default config
