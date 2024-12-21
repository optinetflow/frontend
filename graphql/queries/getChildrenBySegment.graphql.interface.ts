import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
import * as Types from "../../src/graphql/__generated__/schema.graphql";
const defaultOptions = {} as const;
export type GetChildrenBySegmentQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetChildrenBySegmentQuery = {
  __typename?: "Query";
  getChildrenBySegment: {
    __typename?: "GetChildrenBySegmentOutput";
    longLostCustomers: Array<{
      __typename?: "Child";
      id: string;
      fullname: string;
      paymentCount: number;
      phone: string;
      role: Types.Role;
      createdAt: any;
      updatedAt: any;
      isDisabled?: boolean | null;
      balance: number;
      totalProfit: number;
      activePackages: number;
      onlinePackages: number;
      lastConnectedAt?: any | null;
      description?: string | null;
      initialDiscountPercent?: number | null;
      joinedPromotionCode?: string | null;
      telegram?: {
        __typename?: "TelegramUser";
        id: string;
        phone?: string | null;
        firstname?: string | null;
        lastname?: string | null;
        username?: string | null;
        smallAvatar?: string | null;
        bigAvatar?: string | null;
      } | null;
    }>;
    uncategorized: Array<{
      __typename?: "Child";
      id: string;
      fullname: string;
      paymentCount: number;
      phone: string;
      role: Types.Role;
      createdAt: any;
      updatedAt: any;
      isDisabled?: boolean | null;
      balance: number;
      totalProfit: number;
      activePackages: number;
      onlinePackages: number;
      lastConnectedAt?: any | null;
      joinedPromotionCode?: string | null;
      description?: string | null;
      initialDiscountPercent?: number | null;
      telegram?: {
        __typename?: "TelegramUser";
        id: string;
        phone?: string | null;
        firstname?: string | null;
        lastname?: string | null;
        username?: string | null;
        smallAvatar?: string | null;
        bigAvatar?: string | null;
      } | null;
    }>;
    newProspects: Array<{
      __typename?: "Child";
      id: string;
      fullname: string;
      paymentCount: number;
      phone: string;
      role: Types.Role;
      createdAt: any;
      updatedAt: any;
      isDisabled?: boolean | null;
      balance: number;
      joinedPromotionCode?: string | null;
      totalProfit: number;
      activePackages: number;
      onlinePackages: number;
      lastConnectedAt?: any | null;
      description?: string | null;
      initialDiscountPercent?: number | null;
      telegram?: {
        __typename?: "TelegramUser";
        id: string;
        phone?: string | null;
        firstname?: string | null;
        lastname?: string | null;
        username?: string | null;
        smallAvatar?: string | null;
        bigAvatar?: string | null;
      } | null;
    }>;
    engagedSubscribers: Array<{
      __typename?: "Child";
      id: string;
      fullname: string;
      phone: string;
      role: Types.Role;
      paymentCount: number;
      createdAt: any;
      updatedAt: any;
      joinedPromotionCode?: string | null;
      isDisabled?: boolean | null;
      balance: number;
      totalProfit: number;
      activePackages: number;
      onlinePackages: number;
      lastConnectedAt?: any | null;
      description?: string | null;
      initialDiscountPercent?: number | null;
      telegram?: {
        __typename?: "TelegramUser";
        id: string;
        phone?: string | null;
        firstname?: string | null;
        lastname?: string | null;
        username?: string | null;
        smallAvatar?: string | null;
        bigAvatar?: string | null;
      } | null;
    }>;
    dormantSubscribers: Array<{
      __typename?: "Child";
      id: string;
      fullname: string;
      phone: string;
      role: Types.Role;
      createdAt: any;
      updatedAt: any;
      paymentCount: number;
      isDisabled?: boolean | null;
      joinedPromotionCode?: string | null;
      balance: number;
      totalProfit: number;
      activePackages: number;
      onlinePackages: number;
      lastConnectedAt?: any | null;
      description?: string | null;
      initialDiscountPercent?: number | null;
      telegram?: {
        __typename?: "TelegramUser";
        id: string;
        phone?: string | null;
        firstname?: string | null;
        lastname?: string | null;
        username?: string | null;
        smallAvatar?: string | null;
        bigAvatar?: string | null;
      } | null;
    }>;
    recentlyLapsedCustomers: Array<{
      __typename?: "Child";
      id: string;
      fullname: string;
      phone: string;
      role: Types.Role;
      createdAt: any;
      joinedPromotionCode?: string | null;
      updatedAt: any;
      isDisabled?: boolean | null;
      balance: number;
      totalProfit: number;
      paymentCount: number;
      activePackages: number;
      onlinePackages: number;
      lastConnectedAt?: any | null;
      description?: string | null;
      initialDiscountPercent?: number | null;
      telegram?: {
        __typename?: "TelegramUser";
        id: string;
        phone?: string | null;
        firstname?: string | null;
        lastname?: string | null;
        username?: string | null;
        smallAvatar?: string | null;
        bigAvatar?: string | null;
      } | null;
    }>;
    trialExplorers: Array<{
      __typename?: "Child";
      id: string;
      fullname: string;
      phone: string;
      role: Types.Role;
      createdAt: any;
      updatedAt: any;
      isDisabled?: boolean | null;
      joinedPromotionCode?: string | null;
      balance: number;
      paymentCount: number;
      totalProfit: number;
      activePackages: number;
      onlinePackages: number;
      lastConnectedAt?: any | null;
      description?: string | null;
      initialDiscountPercent?: number | null;
      telegram?: {
        __typename?: "TelegramUser";
        id: string;
        phone?: string | null;
        firstname?: string | null;
        lastname?: string | null;
        username?: string | null;
        smallAvatar?: string | null;
        bigAvatar?: string | null;
      } | null;
    }>;
  };
};

export const GetChildrenBySegmentDocument = gql`
  query getChildrenBySegment {
    getChildrenBySegment {
      longLostCustomers {
        id
        fullname
        paymentCount
        phone
        role
        createdAt
        updatedAt
        isDisabled
        balance
        totalProfit
        activePackages
        onlinePackages
        lastConnectedAt
        description
        initialDiscountPercent
        joinedPromotionCode
        telegram {
          id
          phone
          firstname
          lastname
          username
          smallAvatar
          bigAvatar
        }
      }
      uncategorized {
        id
        fullname
        paymentCount
        phone
        role
        createdAt
        updatedAt
        isDisabled
        balance
        totalProfit
        activePackages
        onlinePackages
        lastConnectedAt
        joinedPromotionCode
        description
        initialDiscountPercent
        telegram {
          id
          phone
          firstname
          lastname
          username
          smallAvatar
          bigAvatar
        }
      }
      newProspects {
        id
        fullname
        paymentCount
        phone
        role
        createdAt
        updatedAt
        isDisabled
        balance
        joinedPromotionCode
        totalProfit
        activePackages
        onlinePackages
        lastConnectedAt
        description
        initialDiscountPercent
        telegram {
          id
          phone
          firstname
          lastname
          username
          smallAvatar
          bigAvatar
        }
      }
      engagedSubscribers {
        id
        fullname
        phone
        role
        paymentCount
        createdAt
        updatedAt
        joinedPromotionCode
        isDisabled
        balance
        totalProfit
        activePackages
        onlinePackages
        lastConnectedAt
        description
        initialDiscountPercent
        telegram {
          id
          phone
          firstname
          lastname
          username
          smallAvatar
          bigAvatar
        }
      }
      dormantSubscribers {
        id
        fullname
        phone
        role
        createdAt
        updatedAt
        paymentCount
        isDisabled
        joinedPromotionCode
        balance
        totalProfit
        activePackages
        onlinePackages
        lastConnectedAt
        description
        initialDiscountPercent
        telegram {
          id
          phone
          firstname
          lastname
          username
          smallAvatar
          bigAvatar
        }
      }
      recentlyLapsedCustomers {
        id
        fullname
        phone
        role
        createdAt
        joinedPromotionCode
        updatedAt
        isDisabled
        balance
        totalProfit
        paymentCount
        activePackages
        onlinePackages
        lastConnectedAt
        description
        initialDiscountPercent
        telegram {
          id
          phone
          firstname
          lastname
          username
          smallAvatar
          bigAvatar
        }
      }
      trialExplorers {
        id
        fullname
        phone
        role
        createdAt
        updatedAt
        isDisabled
        joinedPromotionCode
        balance
        paymentCount
        totalProfit
        activePackages
        onlinePackages
        lastConnectedAt
        description
        initialDiscountPercent
        telegram {
          id
          phone
          firstname
          lastname
          username
          smallAvatar
          bigAvatar
        }
      }
    }
  }
`;

/**
 * __useGetChildrenBySegmentQuery__
 *
 * To run a query within a React component, call `useGetChildrenBySegmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChildrenBySegmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChildrenBySegmentQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChildrenBySegmentQuery(
  baseOptions?: Apollo.QueryHookOptions<GetChildrenBySegmentQuery, GetChildrenBySegmentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChildrenBySegmentQuery, GetChildrenBySegmentQueryVariables>(
    GetChildrenBySegmentDocument,
    options
  );
}
export function useGetChildrenBySegmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetChildrenBySegmentQuery, GetChildrenBySegmentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetChildrenBySegmentQuery, GetChildrenBySegmentQueryVariables>(
    GetChildrenBySegmentDocument,
    options
  );
}
export function useGetChildrenBySegmentSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetChildrenBySegmentQuery, GetChildrenBySegmentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetChildrenBySegmentQuery, GetChildrenBySegmentQueryVariables>(
    GetChildrenBySegmentDocument,
    options
  );
}
export type GetChildrenBySegmentQueryHookResult = ReturnType<typeof useGetChildrenBySegmentQuery>;
export type GetChildrenBySegmentLazyQueryHookResult = ReturnType<typeof useGetChildrenBySegmentLazyQuery>;
export type GetChildrenBySegmentSuspenseQueryHookResult = ReturnType<typeof useGetChildrenBySegmentSuspenseQuery>;
export type GetChildrenBySegmentQueryResult = Apollo.QueryResult<
  GetChildrenBySegmentQuery,
  GetChildrenBySegmentQueryVariables
>;
