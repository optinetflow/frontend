import * as Types from "../../src/graphql/__generated__/schema.graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type DeletePromotionCodeMutationVariables = Types.Exact<{
  input: Types.DeletePromotionInput;
}>;

export type DeletePromotionCodeMutation = { __typename?: "Mutation"; deletePromotionCode: boolean };

export const DeletePromotionCodeDocument = gql`
  mutation deletePromotionCode($input: DeletePromotionInput!) {
    deletePromotionCode(data: $input)
  }
`;
export type DeletePromotionCodeMutationFn = Apollo.MutationFunction<
  DeletePromotionCodeMutation,
  DeletePromotionCodeMutationVariables
>;

/**
 * __useDeletePromotionCodeMutation__
 *
 * To run a mutation, you first call `useDeletePromotionCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePromotionCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePromotionCodeMutation, { data, loading, error }] = useDeletePromotionCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePromotionCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePromotionCodeMutation, DeletePromotionCodeMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeletePromotionCodeMutation, DeletePromotionCodeMutationVariables>(
    DeletePromotionCodeDocument,
    options
  );
}
export type DeletePromotionCodeMutationHookResult = ReturnType<typeof useDeletePromotionCodeMutation>;
export type DeletePromotionCodeMutationResult = Apollo.MutationResult<DeletePromotionCodeMutation>;
export type DeletePromotionCodeMutationOptions = Apollo.BaseMutationOptions<
  DeletePromotionCodeMutation,
  DeletePromotionCodeMutationVariables
>;
