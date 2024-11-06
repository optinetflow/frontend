import * as Types from "../../src/graphql/__generated__/schema.graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CreatePromotionCodeMutationVariables = Types.Exact<{
  input: Types.CreatePromotionInput;
}>;

export type CreatePromotionCodeMutation = {
  __typename?: "Mutation";
  createPromotionCode: { __typename?: "Promotion"; code: string };
};

export const CreatePromotionCodeDocument = gql`
  mutation createPromotionCode($input: CreatePromotionInput!) {
    createPromotionCode(data: $input) {
      code
    }
  }
`;
export type CreatePromotionCodeMutationFn = Apollo.MutationFunction<
  CreatePromotionCodeMutation,
  CreatePromotionCodeMutationVariables
>;

/**
 * __useCreatePromotionCodeMutation__
 *
 * To run a mutation, you first call `useCreatePromotionCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePromotionCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPromotionCodeMutation, { data, loading, error }] = useCreatePromotionCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePromotionCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePromotionCodeMutation, CreatePromotionCodeMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePromotionCodeMutation, CreatePromotionCodeMutationVariables>(
    CreatePromotionCodeDocument,
    options
  );
}
export type CreatePromotionCodeMutationHookResult = ReturnType<typeof useCreatePromotionCodeMutation>;
export type CreatePromotionCodeMutationResult = Apollo.MutationResult<CreatePromotionCodeMutation>;
export type CreatePromotionCodeMutationOptions = Apollo.BaseMutationOptions<
  CreatePromotionCodeMutation,
  CreatePromotionCodeMutationVariables
>;
