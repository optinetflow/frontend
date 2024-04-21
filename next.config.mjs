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
          destination: 'http://localhost:3333/graphql',
        },
      ];
    }
  }),
})

export default config
