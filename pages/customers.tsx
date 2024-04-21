import Link from "next/link"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"
import { useUpdateChildMutation } from "../graphql/mutations/updateChild.graphql.interface"
import { useChildrenQuery } from "../graphql/queries/children.graphql.interface"
import { copyText } from '../helpers';
import { avatarColor, convertPersianCurrency, isRecentlyConnected, roundTo, timeSince } from "../helpers"
import { EllipsisHorizontalIcon, NoSymbolIcon, PencilIcon, UserPlusIcon } from "../icons"
import * as Types from '../src/graphql/__generated__/schema.graphql';


interface CustomerProps {
  id: string
  avatar?: string
  firstname: string
  lastname: string
  phone: string
  isDisabled: boolean
  role: Types.Role;
  balance: number;
  totalProfit: number;
  activePackages: number;
  lastConnectedAt?: Date;
}

interface CustomerOptionsProps {
  id: string
  isDisabled: boolean
}
const CustomerOptions: React.FC<CustomerOptionsProps> = ({ id, isDisabled }) => {
  const [updateChild] = useUpdateChildMutation()

  const handleBlockChild = (isEnabled: boolean, childId: string) => {
    updateChild({
      variables: {
        input: { childId, isDisabled: !isEnabled },
      },
    })
      .catch((e) => {
        console.log("e ==>", e)
      })
  }

  return (
    <DropdownMenu>
      {/* <DropdownMenuTrigger className="rounded-full w-12 h-12 text-slate-500 flex justify-center items-center hover:bg-slate-200"><EllipsisHorizontalIcon  /></DropdownMenuTrigger> */}
      <DropdownMenuTrigger asChild>
        <Button className="mr-4 h-12 w-12 rounded-full text-slate-500" size="sm" variant="ghost" type="button">
          <EllipsisHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rtl mx-4 w-48">
        <DropdownMenuItem asChild>
          <Link href={`/customer-edit/${id}`}>
            <PencilIcon className="ml-2 h-4 w-4" />
            <span>ویرایش</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <label
            htmlFor="isDisabled"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <NoSymbolIcon className="ml-2 h-4 w-4" />
              <span>{isDisabled ? "فعال کردن" : "مسدود کردن"}</span>
            </div>
            <Switch
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
  )
}



const Customer: React.FC<CustomerProps> = ({ id, firstname, lastname, isDisabled, phone, avatar, balance, role, totalProfit, activePackages, lastConnectedAt }) => {
  const { toast } = useToast()

  const handlePhoneClick = () => {
    copyText(`0${phone}`);
    toast({
      description: "شماره موبایل کپی شد.",
      duration: 500,
    })
  }
  const isOnline = lastConnectedAt && isRecentlyConnected(lastConnectedAt);
  return (
    <div className={`flex items-center justify-between rounded-lg p-2 ${isDisabled ? "bg-red-50" : ""}`}>
      <div className="relative flex flex-1 overflow-hidden items-center">
        <Avatar className="relative h-12 w-12 text-xs">
          <AvatarImage alt="@shadcn" src={avatar || undefined} />
          <AvatarFallback className={avatarColor(`${firstname} ${lastname}`)}>
            {firstname[0]}‌{lastname[0]}
          </AvatarFallback>
        </Avatar>
        {activePackages > 0 && <div className={`absolute font-black ${role === 'ADMIN' ? 'top-4 right-8' : 'top-0 right-8'}  text-xs w-6 h-6 rounded-full border ${isOnline ? 'bg-green-50 border-green-500 text-green-500' : 'bg-slate-50 border-slate-500 text-slate-500'}  flex items-center justify-center pt-1`}>{activePackages}</div>} 
        <div className="mr-4 flex h-full w-full flex-col justify-between overflow-hidden text-sm space-y-2">
          <div className=" truncate font-black text-slate-800">
            {firstname} {lastname}
          </div>
          {role === 'ADMIN' && <div className="text-slate-600 text-xs">موجودی: {convertPersianCurrency(roundTo(balance,0))}</div>}
          {role === 'ADMIN' && <div className="text-slate-600 text-xs">سود کل: {convertPersianCurrency(roundTo(totalProfit,0))}</div>}
          <button type="button" onClick={handlePhoneClick} className="relative text-xs text-slate-600 text-right">
            0{phone}
            {lastConnectedAt && !isOnline && <div className="absolute top-0 left-0 text-xs font-thin rounded-full text-slate-400">{timeSince(lastConnectedAt)}</div>}
          </button>
        </div>
      </div>
      <CustomerOptions id={id} isDisabled={isDisabled} />
    </div>
  )
}

const CustomersPage: NextPageWithLayout = () => {
  const { data } = useChildrenQuery({ fetchPolicy: "cache-and-network" })

  if (data) {
    return (
      <div className="mx-auto my-12 flex max-w-xs flex-col justify-center" style={{ minHeight: "calc(100vh - 6rem)" }}>
        <div className="w-full space-y-4">
          <Link href="/signup">
            <Button className="flex w-full">
              <UserPlusIcon className="ml-2 h-5 w-5" />
              <span>ثبت نام</span>
            </Button>
          </Link>
          <div className="flex bg-slate-50 text-slate-600 rounded-md text-sm">
            <span className="w-full p-4">بسته: {data.children.reduce((all, child) => all + child.activePackages, 0)}</span>
            <span className="w-full p-4">آنلاین: {data.children.reduce((all, child) => child.lastConnectedAt && isRecentlyConnected(new Date(child.lastConnectedAt)) ? all + 1 : all , 0)}</span>
          </div>
          {data.children.map((child) => (
            <Customer
              key={child.id}
              id={child.id}
              firstname={child.firstname}
              lastname={child.lastname}
              phone={child.phone}
              isDisabled={Boolean(child.isDisabled)}
              avatar={child?.telegram?.smallAvatar || undefined}
              role={child.role}
              balance={child.balance}
              totalProfit={child.totalProfit}
              activePackages={child.activePackages}
              lastConnectedAt={child.lastConnectedAt ? new Date(child.lastConnectedAt) : undefined }
            />
          ))}
        </div>
      </div>
    )
  }
}

export default CustomersPage

CustomersPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
