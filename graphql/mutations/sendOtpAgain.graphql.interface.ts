import * as Types from '../../src/graphql/__generated__/schema.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendOtpAgainMutationVariables = Types.Exact<{
  input: Types.SendOtpAgainInput;
}>;


export type SendOtpAgainMutation = { __typename?: 'Mutation', sendOtpAgain: boolean };


export const SendOtpAgainDocument = gql`
    mutation sendOtpAgain($input: SendOtpAgainInput!) {
  sendOtpAgain(data: $input)
}
    `;
export type SendOtpAgainMutationFn = Apollo.MutationFunction<SendOtpAgainMutation, SendOtpAgainMutationVariables>;

/**
 * __useSendOtpAgainMutation__
 *
 * To run a mutation, you first call `useSendOtpAgainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpAgainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpAgainMutation, { data, loading, error }] = useSendOtpAgainMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendOtpAgainMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpAgainMutation, SendOtpAgainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpAgainMutation, SendOtpAgainMutationVariables>(SendOtpAgainDocument, options);
      }
export type SendOtpAgainMutationHookResult = ReturnType<typeof useSendOtpAgainMutation>;
export type SendOtpAgainMutationResult = Apollo.MutationResult<SendOtpAgainMutation>;
export type SendOtpAgainMutationOptions = Apollo.BaseMutationOptions<SendOtpAgainMutation, SendOtpAgainMutationVariables>;