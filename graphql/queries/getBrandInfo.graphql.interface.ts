import * as Types from '../../src/graphql/__generated__/schema.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBrandInfoQueryVariables = Types.Exact<{
  input: Types.GetBrandInfoInput;
}>;


export type GetBrandInfoQuery = { __typename?: 'Query', getBrandInfo: { __typename?: 'Brand', title: string, description: string, logo?: any | null } };


export const GetBrandInfoDocument = gql`
    query getBrandInfo($input: GetBrandInfoInput!) {
  getBrandInfo(input: $input) {
    title
    description
    logo
  }
}
    `;

/**
 * __useGetBrandInfoQuery__
 *
 * To run a query within a React component, call `useGetBrandInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandInfoQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBrandInfoQuery(baseOptions: Apollo.QueryHookOptions<GetBrandInfoQuery, GetBrandInfoQueryVariables> & ({ variables: GetBrandInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandInfoQuery, GetBrandInfoQueryVariables>(GetBrandInfoDocument, options);
      }
export function useGetBrandInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandInfoQuery, GetBrandInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandInfoQuery, GetBrandInfoQueryVariables>(GetBrandInfoDocument, options);
        }
export function useGetBrandInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBrandInfoQuery, GetBrandInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandInfoQuery, GetBrandInfoQueryVariables>(GetBrandInfoDocument, options);
        }
export type GetBrandInfoQueryHookResult = ReturnType<typeof useGetBrandInfoQuery>;
export type GetBrandInfoLazyQueryHookResult = ReturnType<typeof useGetBrandInfoLazyQuery>;
export type GetBrandInfoSuspenseQueryHookResult = ReturnType<typeof useGetBrandInfoSuspenseQuery>;
export type GetBrandInfoQueryResult = Apollo.QueryResult<GetBrandInfoQuery, GetBrandInfoQueryVariables>;