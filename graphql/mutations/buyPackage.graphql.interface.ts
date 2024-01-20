import * as Types from '../../src/graphql/__generated__/schema.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BuyPackageMutationVariables = Types.Exact<{
  input: Types.BuyPackageInput;
}>;


export type BuyPackageMutation = { __typename?: 'Mutation', buyPackage: string };


export const BuyPackageDocument = gql`
    mutation BuyPackage($input: BuyPackageInput!) {
  buyPackage(data: $input)
}
    `;
export type BuyPackageMutationFn = Apollo.MutationFunction<BuyPackageMutation, BuyPackageMutationVariables>;

/**
 * __useBuyPackageMutation__
 *
 * To run a mutation, you first call `useBuyPackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuyPackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buyPackageMutation, { data, loading, error }] = useBuyPackageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBuyPackageMutation(baseOptions?: Apollo.MutationHookOptions<BuyPackageMutation, BuyPackageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BuyPackageMutation, BuyPackageMutationVariables>(BuyPackageDocument, options);
      }
export type BuyPackageMutationHookResult = ReturnType<typeof useBuyPackageMutation>;
export type BuyPackageMutationResult = Apollo.MutationResult<BuyPackageMutation>;
export type BuyPackageMutationOptions = Apollo.BaseMutationOptions<BuyPackageMutation, BuyPackageMutationVariables>;