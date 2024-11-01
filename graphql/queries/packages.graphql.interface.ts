import * as Types from "../../src/graphql/__generated__/schema.graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetPackagesQueryVariables = Types.Exact<{
  input: Types.GetPackageInput;
}>;

export type GetPackagesQuery = {
  __typename?: "Query";
  packages: Array<{
    __typename?: "Package";
    id: string;
    price: number;
    discountedPrice?: number | null;
    traffic: number;
    expirationDays: number;
    userCount: number;
    category: Types.PackageCategory;
    categoryFa?: string | null;
  }>;
};

export const GetPackagesDocument = gql`
  query GetPackages($input: GetPackageInput!) {
    packages(data: $input) {
      id
      price
      discountedPrice
      traffic
      expirationDays
      userCount
      category
      categoryFa
    }
  }
`;

/**
 * __useGetPackagesQuery__
 *
 * To run a query within a React component, call `useGetPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPackagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPackagesQuery(
  baseOptions: Apollo.QueryHookOptions<GetPackagesQuery, GetPackagesQueryVariables> &
    ({ variables: GetPackagesQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPackagesQuery, GetPackagesQueryVariables>(GetPackagesDocument, options);
}
export function useGetPackagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPackagesQuery, GetPackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPackagesQuery, GetPackagesQueryVariables>(GetPackagesDocument, options);
}
export function useGetPackagesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetPackagesQuery, GetPackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPackagesQuery, GetPackagesQueryVariables>(GetPackagesDocument, options);
}
export type GetPackagesQueryHookResult = ReturnType<typeof useGetPackagesQuery>;
export type GetPackagesLazyQueryHookResult = ReturnType<typeof useGetPackagesLazyQuery>;
export type GetPackagesSuspenseQueryHookResult = ReturnType<typeof useGetPackagesSuspenseQuery>;
export type GetPackagesQueryResult = Apollo.QueryResult<GetPackagesQuery, GetPackagesQueryVariables>;
