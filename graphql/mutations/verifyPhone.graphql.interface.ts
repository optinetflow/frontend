import * as Types from "../../src/graphql/__generated__/schema.graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type VerifyPhoneMutationVariables = Types.Exact<{
  input: Types.VerifyPhoneInput;
}>;

export type VerifyPhoneMutation = {
  __typename?: "Mutation";
  verifyPhone: { __typename?: "Token"; accessToken: any; refreshToken: any };
};

export const VerifyPhoneDocument = gql`
  mutation verifyPhone($input: VerifyPhoneInput!) {
    verifyPhone(data: $input) {
      accessToken
      refreshToken
    }
  }
`;
export type VerifyPhoneMutationFn = Apollo.MutationFunction<VerifyPhoneMutation, VerifyPhoneMutationVariables>;

/**
 * __useVerifyPhoneMutation__
 *
 * To run a mutation, you first call `useVerifyPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPhoneMutation, { data, loading, error }] = useVerifyPhoneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyPhoneMutation(
  baseOptions?: Apollo.MutationHookOptions<VerifyPhoneMutation, VerifyPhoneMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyPhoneMutation, VerifyPhoneMutationVariables>(VerifyPhoneDocument, options);
}
export type VerifyPhoneMutationHookResult = ReturnType<typeof useVerifyPhoneMutation>;
export type VerifyPhoneMutationResult = Apollo.MutationResult<VerifyPhoneMutation>;
export type VerifyPhoneMutationOptions = Apollo.BaseMutationOptions<VerifyPhoneMutation, VerifyPhoneMutationVariables>;
