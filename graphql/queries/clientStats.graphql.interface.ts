import * as Types from '../../src/graphql/__generated__/schema.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetClientStatsQueryVariables = Types.Exact<{
  filters: Types.GetClientStatsFiltersInput;
}>;


export type GetClientStatsQuery = { __typename?: 'Query', clientStats: Array<{ __typename?: 'ClientStat', id: string, email: string, down: any, up: any, total: any, expiryTime: any, enable: boolean }> };


export const GetClientStatsDocument = gql`
    query getClientStats($filters: GetClientStatsFiltersInput!) {
  clientStats(filters: $filters) {
    id
    email
    down
    up
    total
    expiryTime
    enable
  }
}
    `;

/**
 * __useGetClientStatsQuery__
 *
 * To run a query within a React component, call `useGetClientStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientStatsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetClientStatsQuery(baseOptions: Apollo.QueryHookOptions<GetClientStatsQuery, GetClientStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientStatsQuery, GetClientStatsQueryVariables>(GetClientStatsDocument, options);
      }
export function useGetClientStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientStatsQuery, GetClientStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientStatsQuery, GetClientStatsQueryVariables>(GetClientStatsDocument, options);
        }
export type GetClientStatsQueryHookResult = ReturnType<typeof useGetClientStatsQuery>;
export type GetClientStatsLazyQueryHookResult = ReturnType<typeof useGetClientStatsLazyQuery>;
export type GetClientStatsQueryResult = Apollo.QueryResult<GetClientStatsQuery, GetClientStatsQueryVariables>;