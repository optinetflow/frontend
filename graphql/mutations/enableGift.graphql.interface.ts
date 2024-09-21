import * as Types from '../../src/graphql/__generated__/schema.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EnableGiftMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type EnableGiftMutation = { __typename?: 'Mutation', enableGift: boolean };


export const EnableGiftDocument = gql`
    mutation enableGift {
  enableGift
}
    `;
export type EnableGiftMutationFn = Apollo.MutationFunction<EnableGiftMutation, EnableGiftMutationVariables>;

/**
 * __useEnableGiftMutation__
 *
 * To run a mutation, you first call `useEnableGiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableGiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableGiftMutation, { data, loading, error }] = useEnableGiftMutation({
 *   variables: {
 *   },
 * });
 */
export function useEnableGiftMutation(baseOptions?: Apollo.MutationHookOptions<EnableGiftMutation, EnableGiftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableGiftMutation, EnableGiftMutationVariables>(EnableGiftDocument, options);
      }
export type EnableGiftMutationHookResult = ReturnType<typeof useEnableGiftMutation>;
export type EnableGiftMutationResult = Apollo.MutationResult<EnableGiftMutation>;
export type EnableGiftMutationOptions = Apollo.BaseMutationOptions<EnableGiftMutation, EnableGiftMutationVariables>;