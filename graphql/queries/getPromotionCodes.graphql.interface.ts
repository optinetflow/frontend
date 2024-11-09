import * as Types from "../../src/graphql/__generated__/schema.graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetPromotionCodesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetPromotionCodesQuery = {
  __typename?: "Query";
  getPromotionCodes: Array<{
    __typename?: "Promotion";
    id: string;
    code: string;
    giftPackage?: { __typename?: "Package"; traffic: number } | null;
  }>;
};

export const GetPromotionCodesDocument = gql`
  query getPromotionCodes {
    getPromotionCodes {
      id
      code
      giftPackage {
        traffic
      }
    }
  }
`;

/**
 * __useGetPromotionCodesQuery__
 *
 * To run a query within a React component, call `useGetPromotionCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPromotionCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPromotionCodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPromotionCodesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPromotionCodesQuery, GetPromotionCodesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPromotionCodesQuery, GetPromotionCodesQueryVariables>(GetPromotionCodesDocument, options);
}
export function useGetPromotionCodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPromotionCodesQuery, GetPromotionCodesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPromotionCodesQuery, GetPromotionCodesQueryVariables>(
    GetPromotionCodesDocument,
    options
  );
}
export function useGetPromotionCodesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetPromotionCodesQuery, GetPromotionCodesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPromotionCodesQuery, GetPromotionCodesQueryVariables>(
    GetPromotionCodesDocument,
    options
  );
}
export type GetPromotionCodesQueryHookResult = ReturnType<typeof useGetPromotionCodesQuery>;
export type GetPromotionCodesLazyQueryHookResult = ReturnType<typeof useGetPromotionCodesLazyQuery>;
export type GetPromotionCodesSuspenseQueryHookResult = ReturnType<typeof useGetPromotionCodesSuspenseQuery>;
export type GetPromotionCodesQueryResult = Apollo.QueryResult<GetPromotionCodesQuery, GetPromotionCodesQueryVariables>;
