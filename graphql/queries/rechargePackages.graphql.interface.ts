import * as Types from "../../src/graphql/__generated__/schema.graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type RechargePackagesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type RechargePackagesQuery = {
  __typename?: "Query";
  rechargePackages: Array<{ __typename?: "RechargePackage"; id: string; amount: number; discountPercent: number }>;
};

export const RechargePackagesDocument = gql`
  query rechargePackages {
    rechargePackages {
      id
      amount
      discountPercent
    }
  }
`;

/**
 * __useRechargePackagesQuery__
 *
 * To run a query within a React component, call `useRechargePackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRechargePackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRechargePackagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRechargePackagesQuery(
  baseOptions?: Apollo.QueryHookOptions<RechargePackagesQuery, RechargePackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RechargePackagesQuery, RechargePackagesQueryVariables>(RechargePackagesDocument, options);
}
export function useRechargePackagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RechargePackagesQuery, RechargePackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RechargePackagesQuery, RechargePackagesQueryVariables>(RechargePackagesDocument, options);
}
export function useRechargePackagesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<RechargePackagesQuery, RechargePackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<RechargePackagesQuery, RechargePackagesQueryVariables>(
    RechargePackagesDocument,
    options
  );
}
export type RechargePackagesQueryHookResult = ReturnType<typeof useRechargePackagesQuery>;
export type RechargePackagesLazyQueryHookResult = ReturnType<typeof useRechargePackagesLazyQuery>;
export type RechargePackagesSuspenseQueryHookResult = ReturnType<typeof useRechargePackagesSuspenseQuery>;
export type RechargePackagesQueryResult = Apollo.QueryResult<RechargePackagesQuery, RechargePackagesQueryVariables>;
