import { ApolloProvider } from "@apollo/client"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { useApollo } from "../lib/apollo"
import "../styles/tailwind.scss"

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps)
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  if (apolloClient) {
    return getLayout(
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}
