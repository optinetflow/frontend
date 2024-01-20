import * as Types from '../../src/graphql/__generated__/schema.graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BuyRechargePackageMutationVariables = Types.Exact<{
  input: Types.BuyRechargePackageInput;
}>;


export type BuyRechargePackageMutation = { __typename?: 'Mutation', buyRechargePackage: { __typename?: 'User', id: string, balance: number, totalProfit: number } };


export const BuyRechargePackageDocument = gql`
    mutation buyRechargePackage($input: BuyRechargePackageInput!) {
  buyRechargePackage(input: $input) {
    id
    balance
    totalProfit
  }
}
    `;
export type BuyRechargePackageMutationFn = Apollo.MutationFunction<BuyRechargePackageMutation, BuyRechargePackageMutationVariables>;

/**
 * __useBuyRechargePackageMutation__
 *
 * To run a mutation, you first call `useBuyRechargePackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuyRechargePackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buyRechargePackageMutation, { data, loading, error }] = useBuyRechargePackageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBuyRechargePackageMutation(baseOptions?: Apollo.MutationHookOptions<BuyRechargePackageMutation, BuyRechargePackageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BuyRechargePackageMutation, BuyRechargePackageMutationVariables>(BuyRechargePackageDocument, options);
      }
export type BuyRechargePackageMutationHookResult = ReturnType<typeof useBuyRechargePackageMutation>;
export type BuyRechargePackageMutationResult = Apollo.MutationResult<BuyRechargePackageMutation>;
export type BuyRechargePackageMutationOptions = Apollo.BaseMutationOptions<BuyRechargePackageMutation, BuyRechargePackageMutationVariables>;