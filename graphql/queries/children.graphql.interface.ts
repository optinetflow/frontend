import * as Types from '../../src/graphql/__generated__/schema.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChildrenQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ChildrenQuery = { __typename?: 'Query', children: Array<{ __typename?: 'Child', id: string, firstname: string, lastname: string, phone: string, role: Types.Role, createdAt: any, updatedAt: any, isDisabled?: boolean | null, balance: number, totalProfit: number, activePackages: number, onlinePackages: number, lastConnectedAt?: any | null, description?: string | null, telegram?: { __typename?: 'TelegramUser', id: any, phone?: string | null, firstname?: string | null, lastname?: string | null, username?: string | null, smallAvatar?: string | null, bigAvatar?: string | null } | null }> };


export const ChildrenDocument = gql`
    query children {
  children {
    id
    firstname
    lastname
    phone
    role
    createdAt
    updatedAt
    isDisabled
    balance
    totalProfit
    activePackages
    onlinePackages
    lastConnectedAt
    description
    telegram {
      id
      phone
      firstname
      lastname
      username
      smallAvatar
      bigAvatar
    }
  }
}
    `;

/**
 * __useChildrenQuery__
 *
 * To run a query within a React component, call `useChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChildrenQuery({
 *   variables: {
 *   },
 * });
 */
export function useChildrenQuery(baseOptions?: Apollo.QueryHookOptions<ChildrenQuery, ChildrenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChildrenQuery, ChildrenQueryVariables>(ChildrenDocument, options);
      }
export function useChildrenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChildrenQuery, ChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChildrenQuery, ChildrenQueryVariables>(ChildrenDocument, options);
        }
export type ChildrenQueryHookResult = ReturnType<typeof useChildrenQuery>;
export type ChildrenLazyQueryHookResult = ReturnType<typeof useChildrenLazyQuery>;
export type ChildrenQueryResult = Apollo.QueryResult<ChildrenQuery, ChildrenQueryVariables>;