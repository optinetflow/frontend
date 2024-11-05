import * as Types from "../../src/graphql/__generated__/schema.graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type EnableTodayFreePackageMutationVariables = Types.Exact<{ [key: string]: never }>;

export type EnableTodayFreePackageMutation = {
  __typename?: "Mutation";
  enableTodayFreePackage?: {
    __typename?: "UserPackageOutput";
    id: string;
    name: string;
    link: string;
    remainingTraffic: any;
    totalTraffic: any;
    expiryTime: any;
    createdAt: any;
    updatedAt: any;
    lastConnectedAt?: any | null;
    category: Types.PackageCategory;
    categoryFa?: string | null;
  } | null;
};

export const EnableTodayFreePackageDocument = gql`
  mutation enableTodayFreePackage {
    enableTodayFreePackage {
      id
      name
      link
      remainingTraffic
      totalTraffic
      expiryTime
      createdAt
      updatedAt
      lastConnectedAt
      category
      categoryFa
    }
  }
`;
export type EnableTodayFreePackageMutationFn = Apollo.MutationFunction<
  EnableTodayFreePackageMutation,
  EnableTodayFreePackageMutationVariables
>;

/**
 * __useEnableTodayFreePackageMutation__
 *
 * To run a mutation, you first call `useEnableTodayFreePackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTodayFreePackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTodayFreePackageMutation, { data, loading, error }] = useEnableTodayFreePackageMutation({
 *   variables: {
 *   },
 * });
 */
export function useEnableTodayFreePackageMutation(
  baseOptions?: Apollo.MutationHookOptions<EnableTodayFreePackageMutation, EnableTodayFreePackageMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EnableTodayFreePackageMutation, EnableTodayFreePackageMutationVariables>(
    EnableTodayFreePackageDocument,
    options
  );
}
export type EnableTodayFreePackageMutationHookResult = ReturnType<typeof useEnableTodayFreePackageMutation>;
export type EnableTodayFreePackageMutationResult = Apollo.MutationResult<EnableTodayFreePackageMutation>;
export type EnableTodayFreePackageMutationOptions = Apollo.BaseMutationOptions<
  EnableTodayFreePackageMutation,
  EnableTodayFreePackageMutationVariables
>;
