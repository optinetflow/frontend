import * as Types from '../../src/graphql/__generated__/schema.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstname: string, lastname: string, phone: string, role: Types.Role, createdAt: any, updatedAt: any, isDisabled?: boolean | null, isParentDisabled?: boolean | null, balance: number, totalProfit: number, maxRechargeDiscountPercent?: number | null, bankCard?: Array<{ __typename?: 'BankCard', name: string, number: string }> | null, telegram?: { __typename?: 'TelegramUser', id: any, phone?: string | null, firstname: string, lastname: string, username?: string | null, smallAvatar?: string | null, bigAvatar?: string | null } | null, parent?: { __typename?: 'Parent', id: string, telegram?: { __typename?: 'ParentTelegram', username?: string | null } | null, bankCard?: Array<{ __typename?: 'BankCard', number: string }> | null } | null } };


export const MeDocument = gql`
    query Me {
  me {
    id
    firstname
    lastname
    phone
    role
    createdAt
    updatedAt
    isDisabled
    isParentDisabled
    balance
    totalProfit
    maxRechargeDiscountPercent
    bankCard {
      name
      number
    }
    telegram {
      id
      phone
      firstname
      lastname
      username
      smallAvatar
      bigAvatar
    }
    parent {
      id
      telegram {
        username
      }
      bankCard {
        number
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;