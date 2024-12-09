import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

import Accordion from "components/Accordion/Accordion";
import type { NextPageWithLayout } from "./_app";
import AccordionItem from "../components/Accordion/AccordionItem";
import Layout from "../components/Layout/Layout";
import { useUpdateChildMutation } from "../graphql/mutations/updateChild.graphql.interface";
import {
  GetChildrenBySegmentDocument,
  GetChildrenBySegmentQuery,
  useGetChildrenBySegmentQuery,
} from "../graphql/queries/getChildrenBySegment.graphql.interface";
import { copyText } from "../helpers";
import { avatarColor, roundTo, timeSince, toIRR } from "../helpers";
import { EllipsisHorizontalIcon, NoSymbolIcon, PencilIcon, UserPlusIcon } from "../icons";
import * as Types from "../src/graphql/__generated__/schema.graphql";

interface CustomerProps {
  id: string;
  avatar?: string;
  fullname: string;
  phone: string;
  isDisabled: boolean;
  role: Types.Role;
  balance: number;
  totalProfit: number;
  activePackages: number;
  onlinePackages: number;
  lastConnectedAt?: Date;
  description?: string | null;
}

export enum UserSegment {
  ENGAGED_SUBSCRIBERS = "engagedSubscribers",
  DORMANT_SUBSCRIBERS = "dormantSubscribers",
  LONG_LOST_CUSTOMERS = "longLostCustomers",
  RECENTLY_LAPSED_CUSTOMERS = "recentlyLapsedCustomers",
  NEW_PROSPECTS = "newProspects",
  UNCATEGORIZED = "uncategorized",
}

const UserSegmentDisplay: { [key in UserSegment]: string } = {
  [UserSegment.ENGAGED_SUBSCRIBERS]: "مشتریان فعال",
  [UserSegment.DORMANT_SUBSCRIBERS]: "مشتریان غیرفعال",
  [UserSegment.LONG_LOST_CUSTOMERS]: "مشتریان از دست رفته",
  [UserSegment.RECENTLY_LAPSED_CUSTOMERS]: "مشتریان اخیرا غیرفعال شده",
  [UserSegment.NEW_PROSPECTS]: "مشتریان جدید",
  [UserSegment.UNCATEGORIZED]: "دسته‌بندی نشده",
};

interface CustomerOptionsProps {
  id: string;
  isDisabled: boolean;
}
const CustomerOptions: React.FC<CustomerOptionsProps> = ({ id, isDisabled }) => {
  const [updateChild, updateChildData] = useUpdateChildMutation();
  const client = useApolloClient();

  const handleBlockChild = async (isEnabled: boolean, childId: string) => {
    try {
      await updateChild({
        variables: {
          input: { childId, isDisabled: !isEnabled },
        },
        update: () => {
          const existingData = client.readQuery<GetChildrenBySegmentQuery>({ query: GetChildrenBySegmentDocument });

          // if (existingData) {
          //   const updatedChildren = existingData.children.map((child) =>
          //     child.id === childId ? { ...child, isDisabled: !isEnabled } : child
          //   );

          //   client.writeQuery({
          //     query: GetChildrenBySegmentDocument,
          //     data: { children: updatedChildren },
          //   });
          // }
        },
      });
    } catch (e) {
      console.log("Error updating child status:", e);
    }
  };

  return (
    <DropdownMenu>
      {/* <DropdownMenuTrigger className="rounded-full w-12 h-12 text-slate-500 flex justify-center items-center hover:bg-slate-200"><EllipsisHorizontalIcon  /></DropdownMenuTrigger> */}
      <DropdownMenuTrigger asChild>
        <Button className="mr-4 size-12 rounded-full text-slate-500" size="sm" variant="ghost" type="button">
          <EllipsisHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rtl mx-4 w-48">
        <DropdownMenuItem asChild>
          <Link href={`/customer-edit/${id}`}>
            <PencilIcon className="ml-2 size-4" />
            <span>ویرایش</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild disabled={updateChildData.loading}>
          <label
            htmlFor="isDisabled"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <NoSymbolIcon className="ml-2 size-4" />
              {updateChildData.loading ? (
                <span>در حال انجام...</span>
              ) : (
                <span>{isDisabled ? "فعال کردن" : "مسدود کردن"}</span>
              )}
            </div>
            <Switch
              disabled={updateChildData.loading}
              onClick={(e) => e.stopPropagation()}
              id="isDisabled"
              defaultChecked={!isDisabled}
              onCheckedChange={(value) => handleBlockChild(value, id)}
              className="ltr"
            />
          </label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Customer: React.FC<CustomerProps> = ({
  id,
  fullname,
  isDisabled,
  phone,
  avatar,
  balance,
  role,
  totalProfit,
  activePackages,
  lastConnectedAt,
  description,
  onlinePackages,
}) => {
  const { toast } = useToast();

  const handlePhoneClick = () => {
    copyText(`0${phone}`);
    toast({
      description: "شماره موبایل کپی شد.",
      duration: 500,
    });
  };
  const isOnline = lastConnectedAt && onlinePackages > 0;
  return (
    <div className={`flex items-center justify-between rounded-lg p-2 ${isDisabled ? "bg-red-50" : ""}`}>
      <div className="relative flex flex-1 items-center overflow-hidden">
        <Avatar className="relative size-12 text-xs">
          <AvatarImage alt="@shadcn" src={avatar || undefined} />
          <AvatarFallback className={avatarColor(`${fullname}`)}>{fullname[0]}‌</AvatarFallback>
        </Avatar>
        {activePackages > 0 && (
          <div
            className={`absolute font-black ${role === "ADMIN" ? (description ? "right-8 top-6" : "right-8 top-4") : "right-8 top-0"}  size-6 rounded-full border text-xs ${isOnline ? "border-green-500 bg-green-50 text-green-500" : "border-slate-500 bg-slate-50 text-slate-500"}  flex items-center justify-center pt-1`}
          >
            {activePackages}
          </div>
        )}
        <div className="mr-4 flex size-full flex-col justify-between space-y-2 overflow-hidden text-sm">
          <div className="truncate font-black text-slate-800">{fullname}</div>
          {role === "ADMIN" && <div className="text-xs text-slate-600">موجودی: {toIRR(roundTo(balance, 0))}</div>}
          {role === "ADMIN" && <div className="text-xs text-slate-600">سود کل: {toIRR(roundTo(totalProfit, 0))}</div>}
          <button type="button" onClick={handlePhoneClick} className="relative text-right text-xs text-slate-600">
            0{phone}
            {lastConnectedAt && !isOnline && (
              <div className="absolute left-0 top-0 rounded-full text-xs font-thin text-slate-400">
                {timeSince(lastConnectedAt)}
              </div>
            )}
          </button>
          {description && <div className="truncate text-xs font-thin text-slate-300">{description}</div>}
        </div>
      </div>
      <CustomerOptions id={id} isDisabled={isDisabled} />
    </div>
  );
};

const CustomersPage: NextPageWithLayout = () => {
  const { data } = useGetChildrenBySegmentQuery({ fetchPolicy: "cache-and-network" });
  if (data) {
    const segments = [
      {
        segment: UserSegment.ENGAGED_SUBSCRIBERS,
        customers: data.getChildrenBySegment.engagedSubscribers,
      },
      {
        segment: UserSegment.DORMANT_SUBSCRIBERS,
        customers: data.getChildrenBySegment.dormantSubscribers,
      },
      {
        segment: UserSegment.LONG_LOST_CUSTOMERS,
        customers: data.getChildrenBySegment.longLostCustomers,
      },
      {
        segment: UserSegment.RECENTLY_LAPSED_CUSTOMERS,
        customers: data.getChildrenBySegment.recentlyLapsedCustomers,
      },
      {
        segment: UserSegment.NEW_PROSPECTS,
        customers: data.getChildrenBySegment.newProspects,
      },
      {
        segment: UserSegment.UNCATEGORIZED,
        customers: data.getChildrenBySegment.uncategorized || [], // Handle undefined
      },
    ];
    const sortedSegments = segments.sort((a, b) => b.customers.length - a.customers.length);
    return (
      <div className="mx-auto my-12 flex max-w-xs flex-col justify-center">
        <div className="w-full space-y-4">
          <Link href="/signup">
            <Button className="flex w-full">
              <UserPlusIcon className="ml-2 size-5" />
              <span>ثبت نام</span>
            </Button>
          </Link>
          <div className="flex rounded-md bg-slate-50 text-sm text-slate-600">
            <span className="w-full p-4">
              بسته:
              {data.getChildrenBySegment.engagedSubscribers.reduce((all, child) => all + child.activePackages, 0) +
                data.getChildrenBySegment.dormantSubscribers.reduce((all, child) => all + child.activePackages, 0) +
                data.getChildrenBySegment.newProspects.reduce((all, child) => all + child.activePackages, 0)}
            </span>
            <span className="w-full p-4">
              آنلاین:{" "}
              {data.getChildrenBySegment.newProspects.reduce((all, child) => all + child.onlinePackages, 0) +
                data.getChildrenBySegment.engagedSubscribers.reduce((all, child) => all + child.onlinePackages, 0)}
            </span>
          </div>
          <Accordion className="w-full space-y-2 p-4">
            {sortedSegments.map(({ segment, customers }) => (
              <AccordionItem key={segment} title={`${UserSegmentDisplay[segment]} ${customers.length}`}>
                {customers.length > 0 ? (
                  customers.map((child) => (
                    <Customer
                      key={child.id}
                      id={child.id}
                      fullname={child.fullname}
                      phone={child.phone}
                      isDisabled={Boolean(child.isDisabled)}
                      avatar={child?.telegram?.smallAvatar || undefined}
                      role={child.role}
                      balance={child.balance}
                      totalProfit={child.totalProfit}
                      activePackages={child.activePackages}
                      onlinePackages={child.onlinePackages}
                      lastConnectedAt={child.lastConnectedAt ? new Date(child.lastConnectedAt) : undefined}
                      description={child.description}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">مشتری برای این بخش وجود ندارد.</p>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }
};

export default CustomersPage;

CustomersPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
