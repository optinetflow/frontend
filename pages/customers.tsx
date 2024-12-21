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

import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout/Layout";
import { useUpdateChildMutation } from "../graphql/mutations/updateChild.graphql.interface";
import { ChildrenDocument, ChildrenQuery, useChildrenQuery } from "../graphql/queries/children.graphql.interface";
import { copyText } from "../helpers";
import { avatarColor, roundTo, timeSince, toIRR } from "../helpers";
import { ArrowUTurnLeftIcon, EllipsisHorizontalIcon, NoSymbolIcon, PencilIcon } from "../icons";
import * as Types from "../src/graphql/__generated__/schema.graphql";

interface CustomerProps {
  id: string;
  avatar?: string;
  fullname: string;
  joinedPromotionCode?: string;
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
          const existingData = client.readQuery<ChildrenQuery>({ query: ChildrenDocument });

          if (existingData) {
            const updatedChildren = existingData.children.map((child) =>
              child.id === childId ? { ...child, isDisabled: !isEnabled } : child
            );

            client.writeQuery({
              query: ChildrenDocument,
              data: { children: updatedChildren },
            });
          }
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
  joinedPromotionCode,
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
          {joinedPromotionCode && (
            <div className="truncate text-xs font-thin text-slate-300">کد معرف: {joinedPromotionCode}</div>
          )}
        </div>
      </div>
      <CustomerOptions id={id} isDisabled={isDisabled} />
    </div>
  );
};

const CustomersPage: NextPageWithLayout = () => {
  const { data } = useChildrenQuery({ fetchPolicy: "cache-and-network" });
  if (data) {
    return (
      <div className="mx-auto my-12 flex max-w-xs flex-col justify-center" style={{ minHeight: "calc(100vh - 6rem)" }}>
        <div className="w-full space-y-4">
          <Link href="/">
            <Button className="flex w-full">
              <ArrowUTurnLeftIcon className="ml-2 size-5" />
              <span>بازگشت</span>
            </Button>
          </Link>
          <div className="flex rounded-md bg-slate-50 text-sm text-slate-600">
            <span className="w-full p-4">
              بسته: {data.children.reduce((all, child) => all + child.activePackages, 0)}
            </span>
            <span className="w-full p-4">
              آنلاین: {data.children.reduce((all, child) => all + child.onlinePackages, 0)}
            </span>
          </div>
          {data.children.map((child) => (
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
              joinedPromotionCode={child.joinedPromotionCode || undefined}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default CustomersPage;

CustomersPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
