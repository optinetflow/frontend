import * as Types from '../../src/graphql/__generated__/schema.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateChildMutationVariables = Types.Exact<{
  input: Types.UpdateChildInput;
}>;


export type UpdateChildMutation = { __typename?: 'Mutation', updateChild: { __typename?: 'User', id: string, firstname: string, lastname: string, phone: string, role: Types.Role, createdAt: any, updatedAt: any, isDisabled?: boolean | null } };


export const UpdateChildDocument = gql`
    mutation updateChild($input: UpdateChildInput!) {
  updateChild(input: $input) {
    id
    firstname
    lastname
    phone
    role
    createdAt
    updatedAt
    isDisabled
  }
}
    `;
export type UpdateChildMutationFn = Apollo.MutationFunction<UpdateChildMutation, UpdateChildMutationVariables>;

/**
 * __useUpdateChildMutation__
 *
 * To run a mutation, you first call `useUpdateChildMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChildMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChildMutation, { data, loading, error }] = useUpdateChildMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChildMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChildMutation, UpdateChildMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChildMutation, UpdateChildMutationVariables>(UpdateChildDocument, options);
      }
export type UpdateChildMutationHookResult = ReturnType<typeof useUpdateChildMutation>;
export type UpdateChildMutationResult = Apollo.MutationResult<UpdateChildMutation>;
export type UpdateChildMutationOptions = Apollo.BaseMutationOptions<UpdateChildMutation, UpdateChildMutationVariables>;