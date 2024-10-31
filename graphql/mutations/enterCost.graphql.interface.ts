import * as Types from "../../src/graphql/__generated__/schema.graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type EnterCostMutationVariables = Types.Exact<{
  input: Types.EnterCostInput;
}>;

export type EnterCostMutation = {
  __typename?: "Mutation";
  enterCost: { __typename?: "User"; id: string; totalProfit: number };
};

export const EnterCostDocument = gql`
  mutation enterCost($input: EnterCostInput!) {
    enterCost(input: $input) {
      id
      totalProfit
    }
  }
`;
export type EnterCostMutationFn = Apollo.MutationFunction<EnterCostMutation, EnterCostMutationVariables>;

/**
 * __useEnterCostMutation__
 *
 * To run a mutation, you first call `useEnterCostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnterCostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enterCostMutation, { data, loading, error }] = useEnterCostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnterCostMutation(
  baseOptions?: Apollo.MutationHookOptions<EnterCostMutation, EnterCostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EnterCostMutation, EnterCostMutationVariables>(EnterCostDocument, options);
}
export type EnterCostMutationHookResult = ReturnType<typeof useEnterCostMutation>;
export type EnterCostMutationResult = Apollo.MutationResult<EnterCostMutation>;
export type EnterCostMutationOptions = Apollo.BaseMutationOptions<EnterCostMutation, EnterCostMutationVariables>;
