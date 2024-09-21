import { useApolloClient } from "@apollo/client"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"
import { Stat } from "../components/Stat"
import { useEnableGiftMutation } from "../graphql/mutations/enableGift.graphql.interface"
import { useLogoutMutation } from "../graphql/mutations/logout.graphql.interface"
import { MeDocument, MeQuery, useMeQuery } from "../graphql/queries/me.graphql.interface"

import { useUserPackagesQuery } from "../graphql/queries/userPackages.graphql.interface"
import { convertPersianCurrency, jsonToB64Url, roundTo } from "../helpers"
import {
  BanknotesIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  PlusIcon,
  PowerIcon,
  TelegramIcon,
  UsersIcon,
} from "../icons"

const isDevelop = process.env.NODE_ENV === 'development';

const HomePageComponent: React.FC = () => {
  const router = useRouter()
  const client = useApolloClient();
  const { toast } = useToast()
  const me = useMeQuery({ fetchPolicy: "network-only" })
  if(me.data?.me.isVerified === false) {
    router.replace("/auth/verify-phone")
  }
  const { data, refetch: refetchUserPackages } = useUserPackagesQuery({ fetchPolicy: "cache-and-network" })

  const [logout] = useLogoutMutation()
  const [enableGift, enableGiftData] = useEnableGiftMutation()

  const handleLogout = () => {
    logout().then(() => {
      localStorage.clear()
      router.replace("/login")
    })
  }

  const handleEnableGift = () => {
    enableGift({
      update: () => {
        const existingData = client.readQuery<MeQuery>({ query: MeDocument });
        if (existingData) {
          const updatedMe = existingData.me && {...existingData.me, userGift: []}
          client.writeQuery({
            query: MeDocument,
            data: { me: updatedMe },
          });
        }
      },
    }).then(() => {
      refetchUserPackages()
    })
  }

  const botRef = `https://t.me/${me.data?.me.brand?.botUsername}?start=${jsonToB64Url({ uid: me.data?.me.id || "" })}`
  const isAdmin = me?.data?.me.role !== "USER"
  const balance = me.data?.me.balance || 0
  const isBlocked = me.data?.me.isDisabled || me.data?.me.isParentDisabled || false
  const isRegisteredInTelegram = me?.data?.me.telegram?.phone
  const hasBankCard = me.data?.me.bankCard?.[0]?.number
  const registerToBotText = isAdmin ? "ثبت نام در ربات تلگرام" : "پیش از اتمام بسته خبردارم کن (عضویت ربات تلگرام)"
  const hasPackage = Boolean(data?.userPackages?.length)
  const gif = me.data?.me?.userGift?.[0]?.giftPackage?.traffic
  // const gif = 4

  const handleBuyPackageClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    pleaseCharge(e)
    accountIsBlocked(e)
    checkAdminRequirements(e)
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

  const checkAdminRequirements = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isRegisteredInTelegram && isAdmin && !isDevelop) {
      e.preventDefault()
      toast({ variant: "destructive", description: "لطفا در ربات تلگرام عضو شوید." })
    }

    if (!hasBankCard && isAdmin) {
      e.preventDefault()
      toast({ variant: "destructive", description: "از قسمت تنظیمات حساب بانکی خود را وارد کنید." })
    }
  }

  if (data) {
    return (
      <div className="mx-auto my-12 flex max-w-xs flex-col justify-center" style={{ minHeight: "calc(100vh - 6rem)" }}>
        <div className="w-full space-y-4">
          <div className="space-y-2 rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between ">
              <div className="truncate text-sm text-slate-700">
                {me.data?.me?.fullname}
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
              <span>خرید بسته جدید</span>
            </Button>
          </Link>
          {gif && (
            <Button variant="outline" disabled={enableGiftData.loading} className="flex w-full" onClick={handleEnableGift}>
              <span>  {enableGiftData.loading ? "در حال فعال‌سازی..." : `فعال سازی ${gif} گیگ هدیه 🎁🥳`}
              </span>
           </Button>
          )}
          {isAdmin && (
            <Link className="flex" href="/customers" onClick={handleBuyPackageClick}>
              <Button variant="outline" className="flex w-full">
                <UsersIcon className="ml-2 h-5 w-5" />
                <span>مشتری‌ها</span>
              </Button>
            </Link>
          )}
          {isAdmin && (
            <Link className="flex" href="/rechargePackages" onClick={checkAdminRequirements}>
              <Button variant="outline" className="flex w-full">
                <BanknotesIcon className="ml-2 h-5 w-5" />
                <span>افزایش شارژ حساب</span>
              </Button>
            </Link>
          )}
          {isAdmin && (
            <Link className="flex" href="/setting">
              <Button variant="outline" className="flex w-full">
                <Cog6ToothIcon className="ml-2 h-5 w-5" />
                <span>تنظیمات</span>
              </Button>
            </Link>
          )}
          {data.userPackages?.map((userPackage) => (
            <Stat key={userPackage.id} pack={userPackage} onRenewClick={handleBuyPackageClick} />
          ))}
          
          {!me?.data?.me.telegram?.phone && (data.userPackages.length > 0 || isAdmin) && (
            <a className="block" href={botRef}>
              <Button variant="outline" className="flex w-full">
                <TelegramIcon className="ml-2 h-5 w-5" />
                <span>{registerToBotText}</span>
              </Button>
            </a>
          )}
          <div className="flex space-x-4 flex-row-reverse">
            {me.data?.me.parent?.telegram?.username && (
              <a
                target="_blank"
                rel="noreferrer"
                className="flex w-full"
                href={`https://t.me/${me.data?.me.parent?.telegram?.username}`}
              >
                <Button variant="outline" className="flex w-full">
                  <ChatBubbleOvalLeftIcon className="ml-2 h-5 w-5" />
                  <span>پشتیبانی تلگرام</span>
                </Button>
              </a>
            )}
            {hasPackage && (
              <Link className="flex w-full" href="/help">
                <Button variant="outline" className="flex w-full">
                  <InformationCircleIcon className="ml-2 h-5 w-5" />
                  <span>آموزش اتصال</span>
                </Button>
              </Link>
            )}
          </div>
          
        </div>
      </div>
    )
  }
}

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname !== window.location.pathname) {
      const idPattern = /^\/([\w-]+)$/;

      const match = window.location.pathname.match(idPattern);

      if (match) {
        const promoCode = match[1]; // Extract the alphanumeric id part
        router.replace({
          pathname: '/[promoCode]',
          query: { promoCode },
        });
      } else {
        router.replace(window.location.pathname); // Directly replace for other paths
      }
    }
  }, [router]);

  // // Only render the HomePageContent if the current route is "/"
  if (window.location.pathname !== '/') {
    return null;
  }

  return <HomePageComponent />;
}

export default HomePage

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
