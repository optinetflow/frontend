import * as Types from "../../src/graphql/__generated__/schema.graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetGiftPackagesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetGiftPackagesQuery = {
  __typename?: "Query";
  getGiftPackages: Array<{ __typename?: "Package"; id: string; traffic: number }>;
};

export const GetGiftPackagesDocument = gql`
  query getGiftPackages {
    getGiftPackages {
      id
      traffic
    }
  }
`;

/**
 * __useGetGiftPackagesQuery__
 *
 * To run a query within a React component, call `useGetGiftPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGiftPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGiftPackagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGiftPackagesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetGiftPackagesQuery, GetGiftPackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetGiftPackagesQuery, GetGiftPackagesQueryVariables>(GetGiftPackagesDocument, options);
}
export function useGetGiftPackagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGiftPackagesQuery, GetGiftPackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetGiftPackagesQuery, GetGiftPackagesQueryVariables>(GetGiftPackagesDocument, options);
}
export function useGetGiftPackagesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetGiftPackagesQuery, GetGiftPackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetGiftPackagesQuery, GetGiftPackagesQueryVariables>(GetGiftPackagesDocument, options);
}
export type GetGiftPackagesQueryHookResult = ReturnType<typeof useGetGiftPackagesQuery>;
export type GetGiftPackagesLazyQueryHookResult = ReturnType<typeof useGetGiftPackagesLazyQuery>;
export type GetGiftPackagesSuspenseQueryHookResult = ReturnType<typeof useGetGiftPackagesSuspenseQuery>;
export type GetGiftPackagesQueryResult = Apollo.QueryResult<GetGiftPackagesQuery, GetGiftPackagesQueryVariables>;
