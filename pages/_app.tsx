import { ApolloProvider } from '@apollo/client';
import { AppProps } from "next/app"
import localFont from "next/font/local"
import { useApollo } from '../lib/apollo';
import "../styles/tailwind.css"


const iranSans = localFont({ src: '../assets/fonts/IRANSansWeb.woff2' });

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <main className={iranSans.className}>
      <ApolloProvider client={apolloClient}><Component {...pageProps} /></ApolloProvider>
    </main>
  )
}

export default MyApp
