import * as Types from "../../src/graphql/__generated__/schema.graphql"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type RenewPackageMutationVariables = Types.Exact<{
  input: Types.RenewPackageInput
}>

export type RenewPackageMutation = { __typename?: "Mutation"; renewPackage: string }

export const RenewPackageDocument = gql`
  mutation renewPackage($input: RenewPackageInput!) {
    renewPackage(input: $input)
  }
`
export type RenewPackageMutationFn = Apollo.MutationFunction<RenewPackageMutation, RenewPackageMutationVariables>

/**
 * __useRenewPackageMutation__
 *
 * To run a mutation, you first call `useRenewPackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenewPackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renewPackageMutation, { data, loading, error }] = useRenewPackageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRenewPackageMutation(
  baseOptions?: Apollo.MutationHookOptions<RenewPackageMutation, RenewPackageMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RenewPackageMutation, RenewPackageMutationVariables>(RenewPackageDocument, options)
}
export type RenewPackageMutationHookResult = ReturnType<typeof useRenewPackageMutation>
export type RenewPackageMutationResult = Apollo.MutationResult<RenewPackageMutation>
export type RenewPackageMutationOptions = Apollo.BaseMutationOptions<
  RenewPackageMutation,
  RenewPackageMutationVariables
>
