import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { CachePersistor, LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';

import cookie from 'cookie';
import merge from 'deepmerge';

import isEqual from 'lodash.isequal';
import type { GetServerSidePropsContext } from 'next';
import { useEffect, useMemo, useState } from 'react';
import type { IncomingMessage } from 'http';

interface PageProps {
  props?: Record<string, any>;
  __APOLLO_STATE__: string
}

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';
export const COOKIES_TOKEN_NAME = 'jwt';

const getToken = (req?: IncomingMessage) => {
  const parsedCookie = cookie.parse(
    req ? req.headers.cookie ?? '' : document.cookie,
  );

  return parsedCookie[COOKIES_TOKEN_NAME];
};

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = async (ctx?: GetServerSidePropsContext | null) => {  
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    // credentials: 'same-origin',
  })

  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from cookies
    const token = getToken(ctx?.req);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'apollo-require-preflight': true,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error.extensions?.code === 'UNAUTHENTICATED') {
          // Redirect to login page
          window.location.replace(`/login?redirected=${encodeURIComponent(window.location.pathname)}`);
        }
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const cache = new InMemoryCache();

  if (typeof window !== 'undefined') {
    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
      debug: true,
      trigger: 'write',
    });
  }

  


  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: errorLink.concat(authLink.concat(httpLink)),
    cache,
  });
};

export async function initializeApollo(initialState: string | undefined | null = null, ctx = null) {
  const client = apolloClient ?? await createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    // Restore the cache with the merged data
    client.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: PageProps,
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: PageProps) {
  const state = pageProps[APOLLO_STATE_PROPERTY_NAME];
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  // const store = useMemo(() => initializeApollo(state), [state]);

  useEffect(() => {
    (async () => {
      try {
        setClient(await initializeApollo(state));
      } catch (e) {
        console.error(e)
      }
    })();
  }, [state]);

  return client;
}