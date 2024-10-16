import * as Types from "../../src/graphql/__generated__/schema.graphql"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type SendForgetPasswordOtpMutationVariables = Types.Exact<{
  input: Types.SendForgetPasswordOtpInput
}>

export type SendForgetPasswordOtpMutation = { __typename?: "Mutation"; sendForgetPasswordOtp: boolean }

export const SendForgetPasswordOtpDocument = gql`
  mutation sendForgetPasswordOtp($input: SendForgetPasswordOtpInput!) {
    sendForgetPasswordOtp(data: $input)
  }
`
export type SendForgetPasswordOtpMutationFn = Apollo.MutationFunction<
  SendForgetPasswordOtpMutation,
  SendForgetPasswordOtpMutationVariables
>

/**
 * __useSendForgetPasswordOtpMutation__
 *
 * To run a mutation, you first call `useSendForgetPasswordOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendForgetPasswordOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendForgetPasswordOtpMutation, { data, loading, error }] = useSendForgetPasswordOtpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendForgetPasswordOtpMutation(
  baseOptions?: Apollo.MutationHookOptions<SendForgetPasswordOtpMutation, SendForgetPasswordOtpMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SendForgetPasswordOtpMutation, SendForgetPasswordOtpMutationVariables>(
    SendForgetPasswordOtpDocument,
    options
  )
}
export type SendForgetPasswordOtpMutationHookResult = ReturnType<typeof useSendForgetPasswordOtpMutation>
export type SendForgetPasswordOtpMutationResult = Apollo.MutationResult<SendForgetPasswordOtpMutation>
export type SendForgetPasswordOtpMutationOptions = Apollo.BaseMutationOptions<
  SendForgetPasswordOtpMutation,
  SendForgetPasswordOtpMutationVariables
>
