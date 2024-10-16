import * as Types from "../../src/graphql/__generated__/schema.graphql"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type UserPackagesQueryVariables = Types.Exact<{ [key: string]: never }>

export type UserPackagesQuery = {
  __typename?: "Query"
  userPackages: Array<{
    __typename?: "UserPackage"
    id: string
    name: string
    link: string
    remainingTraffic: any
    totalTraffic: any
    expiryTime: any
    createdAt: any
    updatedAt: any
    lastConnectedAt?: any | null
  }>
}

export const UserPackagesDocument = gql`
  query UserPackages {
    userPackages {
      id
      name
      link
      remainingTraffic
      totalTraffic
      expiryTime
      createdAt
      updatedAt
      lastConnectedAt
    }
  }
`

/**
 * __useUserPackagesQuery__
 *
 * To run a query within a React component, call `useUserPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPackagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserPackagesQuery(
  baseOptions?: Apollo.QueryHookOptions<UserPackagesQuery, UserPackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserPackagesQuery, UserPackagesQueryVariables>(UserPackagesDocument, options)
}
export function useUserPackagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserPackagesQuery, UserPackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserPackagesQuery, UserPackagesQueryVariables>(UserPackagesDocument, options)
}
export function useUserPackagesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<UserPackagesQuery, UserPackagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<UserPackagesQuery, UserPackagesQueryVariables>(UserPackagesDocument, options)
}
export type UserPackagesQueryHookResult = ReturnType<typeof useUserPackagesQuery>
export type UserPackagesLazyQueryHookResult = ReturnType<typeof useUserPackagesLazyQuery>
export type UserPackagesSuspenseQueryHookResult = ReturnType<typeof useUserPackagesSuspenseQuery>
export type UserPackagesQueryResult = Apollo.QueryResult<UserPackagesQuery, UserPackagesQueryVariables>
