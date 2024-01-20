import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { NextPageWithLayout } from "./_app"
import { Copyable } from "../components/Copyable/Copyable"
import Layout from "../components/Layout/Layout"
import { useLogoutMutation } from "../graphql/mutations/logout.graphql.interface"
import { useMeQuery } from "../graphql/queries/me.graphql.interface"

import { UserPackagesQuery, useUserPackagesQuery } from "../graphql/queries/userPackages.graphql.interface"
import {
  bytesToGB,
  convertPersianCurrency,
  getRemainingDays,
  jsonToB64Url,
  remainingTimeToWords,
  roundTo,
} from "../helpers"
import { ArrowPathIcon, BanknotesIcon, BellIcon, PlusIcon, PowerIcon, TelegramIcon, UsersIcon } from "../icons"

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never
interface ProgressBarProp {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProp> = ({ progress }) => {
  const rounded = Math.round(progress)
  return (
    <div className="ltr flex-1 rounded-full bg-slate-200">
      <div
        className="rounded-full bg-slate-900 py-1 text-center font-sans text-xs font-medium leading-none text-neutral-200"
        style={{ width: `${rounded}%` }}
      ></div>
    </div>
  )
}

interface StatProps {
  pack: ArrayElement<UserPackagesQuery["userPackages"]>
  onRenewClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}
function Stat({ pack, onRenewClick }: StatProps) {
  const remainingTime = pack.expiryTime - new Date().getTime()
  const totalTraffic = roundTo(bytesToGB(pack.totalTraffic), 2)
  const remainingTraffic = roundTo(bytesToGB(pack.remainingTraffic), 2)
  const remainingDays = getRemainingDays(pack.expiryTime)

  const remainingTimeWords =
    remainingTime > 0 ? `${remainingTimeToWords(remainingTime)} مانده تا اتمام بسته` : "بسته‌ی شما منقضی شده است"
  const expiryTimeNote = pack.expiryTime === 0 ? "بدون محدودیت زمان" : remainingTimeWords
  const packageNote = remainingTraffic > 0 ? expiryTimeNote : "حجم بسته تمام شده است"

  return (
    <div className="space-y-4 rounded-md bg-slate-50 p-4">
      <div className="truncate pb-6 text-lg font-black text-slate-800">{pack.name}</div>
      <div className="text-xs font-thin text-slate-500">{packageNote}</div>
      <div className="flex items-center justify-between">
        <div className="ltr ml-4 pt-1 text-sm font-black text-slate-500">
          {remainingTraffic > 0 ? remainingTraffic : 0} GB
        </div>
        <ProgressBar progress={((remainingTraffic > 0 ? remainingTraffic : 0) / totalTraffic) * 100} />
      </div>

      {remainingDays >= 2 ? (
        <Copyable className="text-xs font-thin text-slate-400" content={pack.link} />
      ) : (
        <Link className="flex" href={`/packages?userPackageId=${pack.id}`} onClick={onRenewClick}>
          <Button variant="outline" className="flex w-full text-slate-600">
            <ArrowPathIcon className="ml-2 h-5 w-5" />
            <span>تمدید بسته</span>
          </Button>
        </Link>
      )}
    </div>
  )
}

const HomePage: NextPageWithLayout = () => {
  const router = useRouter()
  const { toast } = useToast()
  const me = useMeQuery({ fetchPolicy: "cache-and-network" })
  const { data } = useUserPackagesQuery({ fetchPolicy: "cache-and-network" })

  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    logout().then(() => {
      localStorage.clear()
      router.replace("/login")
    })
  }

  const isAdmin = me?.data?.me.role !== "USER"
  const balance = me.data?.me.balance || 0
  const isBlocked = me.data?.me.isDisabled || me.data?.me.isParentDisabled || false
  const isRegisteredInTelegram = me?.data?.me.telegram?.phone;

  const handleBuyPackageClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    pleaseCharge(e)
    accountIsBlocked(e)
    isAdminRegisteredTelegram(e)
  }
  const pleaseCharge = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (balance <= 0 && isAdmin) {
      e.preventDefault()
      toast({ variant: "destructive", description: "ابتدا حساب خود را شارژ کنید." })
    }
  }

  const accountIsBlocked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isBlocked) {
      e.preventDefault()
      toast({ variant: "destructive", description: "حساب شما مسدود شده است." })
    }
  }

  const isAdminRegisteredTelegram = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isRegisteredInTelegram && isAdmin) {
      e.preventDefault()
      toast({ variant: "destructive", description: "ابتدا در ربات تلگرام ثبت نام کنید." })
    }
  }

  if (data) {
    return (
      <div className="mx-auto my-12 flex max-w-xs flex-col justify-center" style={{ minHeight: "calc(100vh - 6rem)" }}>
        <div className="w-full space-y-4">
          <div className="space-y-2 rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between ">
              <div className="truncate text-sm text-slate-700">
                {me.data?.me.firstname} {me.data?.me.lastname}
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="mr-4 flex items-center rounded-full px-4 py-2 text-xs text-slate-400"
              >
                <span>خروج</span>
                <PowerIcon className="mr-2 h-4 w-4" />
              </Button>
            </div>
            {isAdmin && (
              <>
                <div
                  className={`text-xs ${
                    (me.data?.me.balance || 0) < 0 ? "font-black text-red-500" : "text-slate-500"
                  } `}
                >
                  شارژ حساب: {convertPersianCurrency(roundTo(me.data?.me.balance || 0, 0))}
                </div>
                <div className="text-xs text-slate-500">
                  سود کل: {convertPersianCurrency(roundTo(me.data?.me.totalProfit || 0, 0))}
                </div>
              </>
            )}
          </div>

          <Link className="flex" href="/packages" onClick={handleBuyPackageClick}>
            <Button className="flex w-full">
              <PlusIcon className="ml-2 h-5 w-5" />
              <span>خرید بسته</span>
            </Button>
          </Link>
          {isAdmin && (
            <Link className="flex" href="/customers" onClick={handleBuyPackageClick}>
              <Button variant="outline" className="flex w-full">
                <UsersIcon className="ml-2 h-5 w-5" />
                <span>مشتری‌ها</span>
              </Button>
            </Link>
          )}
          {isAdmin && (
            <Link className="flex" href="/rechargePackages" onClick={isAdminRegisteredTelegram}>
              <Button variant="outline" className="flex w-full">
                <BanknotesIcon className="ml-2 h-5 w-5" />
                <span>افزایش شارژ حساب</span>
              </Button>
            </Link>
          )}
          {data.userPackages?.map((userPackage) => (
            <Stat key={userPackage.id} pack={userPackage} onRenewClick={handleBuyPackageClick} />
          ))}
          {!me?.data?.me.telegram?.phone && (data.userPackages.length > 0 || isAdmin) && (
            <a
              className="block"
              href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}?start=${jsonToB64Url({
                uid: me.data?.me.id || "",
              })}`}
            >
              <Button variant="outline" className="flex w-full">
                <BellIcon className="ml-2 h-5 w-5" />
                <span>آیا می‌خواهید پیش از اتمام بسته مطلع شوید؟</span>
              </Button>
            </a>
          )}
          {me.data?.me.parent?.telegram?.username && (
            <a
              target="_blank"
              rel="noreferrer"
              className="flex"
              href={`https://t.me/${me.data?.me.parent?.telegram?.username}`}
            >
              <Button variant="outline" className="flex w-full">
                <TelegramIcon className="ml-2 h-5 w-5" />
                <span>پشتیبانی</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    )
  }
}

export default HomePage

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
