import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { NextPageWithLayout } from "./_app";
import FreePackageBottomSheet from "../components/FreePackageBottomSheet/FreePackageBottomSheet";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Loading/Loading";
import { Stat } from "../components/Stat";
import UpdateMessagePopup from "../components/UpdateMessagePopup/UpdateMessagePopup";
import { useEnableGiftMutation } from "../graphql/mutations/enableGift.graphql.interface";
import { useEnableTodayFreePackageMutation } from "../graphql/mutations/enableTodayFreePackage.graphql.interface";
import { useLogoutMutation } from "../graphql/mutations/logout.graphql.interface";
import { MeDocument, MeQuery, useMeQuery } from "../graphql/queries/me.graphql.interface";

import { useUserPackagesQuery } from "../graphql/queries/userPackages.graphql.interface";
import { clearLocalStorageExcept, jsonToB64Url, removeWWW, roundTo, toIRR } from "../helpers";
import {
  BanknotesIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  PlusIcon,
  PowerIcon,
  TelegramIcon,
  UsersIcon,
} from "../icons";

const isDevelop = process.env.NODE_ENV === "development";

const HomePageComponent: React.FC = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isFreePackageBottomSheetOpen, setFreePackageBottomSheetOpen] = useState(false);
  const me = useMeQuery({ fetchPolicy: "cache-and-network" });

  const {
    data,
    refetch: refetchUserPackages,
    loading: userPackagesLoading,
  } = useUserPackagesQuery({ fetchPolicy: "cache-and-network" });

  const [logout] = useLogoutMutation();
  const [enableGift, enableGiftData] = useEnableGiftMutation();
  const [enableTodayFreePackage, enableTodayFreePackageData] = useEnableTodayFreePackageMutation();

  useEffect(() => {
    if ((!me.loading || me.data) && (!userPackagesLoading || data)) {
      setIsLoading(false);
    }
  }, [data, me.data, me.loading, userPackagesLoading]);

  useEffect(() => {
    if (me.data?.me.isVerified === false) {
      router.replace("/auth/verify-phone");
    }
  }, [router, me.data]);

  const handleLogout = () => {
    logout().then(() => {
      clearLocalStorageExcept("appVersion");
      router.replace("/login");
    });
  };

  const handleEnableGift = () => {
    enableGift({
      update: () => {
        const existingData = client.readQuery<MeQuery>({ query: MeDocument });
        if (existingData) {
          const updatedMe = existingData.me && { ...existingData.me, userGift: [] };
          client.writeQuery({
            query: MeDocument,
            data: { me: updatedMe },
          });
        }
      },
    }).then(() => {
      refetchUserPackages();
    });
  };
  const handleEnableFreePackage = () => {
    enableTodayFreePackage().then(() => {
      setFreePackageBottomSheetOpen(true);
    });
  };

  const botRef = `https://t.me/${me.data?.me.brand?.botUsername}?start=${jsonToB64Url({ uid: me.data?.me.id || "" })}`;
  const isAdmin = me?.data?.me.role !== "USER";
  const balance = me.data?.me.balance || 0;
  const isBlocked = me.data?.me.isDisabled || me.data?.me.isParentDisabled || false;
  const isRegisteredInTelegram = me?.data?.me.telegram?.id;
  const hasBankCard = me.data?.me.bankCard?.[0]?.number;
  const registerToBotText = isAdmin ? "ثبت نام در ربات تلگرام" : "پیش از اتمام بسته خبردارم کن (عضویت ربات تلگرام)";
  const hasPackage = Boolean(data?.userPackages?.length);
  const gif = me.data?.me?.userGift?.[0]?.giftPackage?.traffic;
  const hasFreePackage = me.data?.me.parent?.freePackageId ? true : false;

  const handleBuyPackageClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    accountIsBlocked(e);
    checkAdminRequirements(e);
  };
  const handleGetCustomersClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    pleaseCharge(e);
    accountIsBlocked(e);
    checkAdminRequirements(e);
  };

  const pleaseCharge = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (balance <= 0 && isAdmin) {
      e.preventDefault();
      toast({ variant: "destructive", description: "ابتدا حساب خود را شارژ کنید." });
    }
  };

  const accountIsBlocked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isBlocked) {
      e.preventDefault();
      toast({ variant: "destructive", description: "حساب شما مسدود شده است." });
    }
  };

  const checkAdminRequirements = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isRegisteredInTelegram && isAdmin && !isDevelop) {
      e.preventDefault();
      toast({ variant: "destructive", description: "لطفا در ربات تلگرام عضو شوید." });
    }

    if (!hasBankCard && isAdmin) {
      e.preventDefault();
      toast({ variant: "destructive", description: "از قسمت تنظیمات حساب بانکی خود را وارد کنید." });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data && me.data?.me.isVerified === true) {
    return (
      <div className="mx-auto my-12 flex max-w-xs flex-col justify-center" style={{ minHeight: "calc(100vh - 6rem)" }}>
        <div className="w-full space-y-4">
          <div className="space-y-2 rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between ">
              <div className="truncate text-sm text-slate-700">{me.data?.me?.fullname}</div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="mr-4 flex items-center rounded-full px-4 py-2 text-xs text-slate-400"
              >
                <span>خروج</span>
                <PowerIcon className="mr-2 size-4" />
              </Button>
            </div>
            {isAdmin && (
              <>
                <div
                  className={`text-xs ${
                    (me.data?.me.balance || 0) < 0 ? "font-black text-red-500" : "text-slate-500"
                  } `}
                >
                  شارژ حساب: {toIRR(roundTo(me.data?.me.balance || 0, 0))}
                </div>
              </>
            )}
          </div>

          <Link className="flex" href="/package-categories" onClick={handleBuyPackageClick}>
            <Button className="flex w-full">
              <PlusIcon className="ml-2 size-5" />
              <span>خرید بسته جدید</span>
            </Button>
          </Link>
          {gif && (
            <Button
              variant="outline"
              disabled={enableGiftData.loading}
              className="flex w-full"
              onClick={handleEnableGift}
            >
              <span> {enableGiftData.loading ? "در حال فعال‌سازی..." : `فعال سازی ${gif} گیگ هدیه 🎁🥳`}</span>
            </Button>
          )}
          {hasFreePackage && (
            <Button
              variant="outline"
              disabled={enableTodayFreePackageData.loading}
              className="flex w-full"
              onClick={handleEnableFreePackage}
            >
              <span>دریافت بسته رایگان امروز 🎈</span>
            </Button>
          )}
          {isAdmin && (
            <Link className="flex" href="/customers" onClick={handleGetCustomersClick}>
              <Button variant="outline" className="flex w-full">
                <UsersIcon className="ml-2 size-5" />
                <span>مشتری‌ها</span>
              </Button>
            </Link>
          )}
          {isAdmin && (
            <Link className="flex" href="/rechargePackages" onClick={checkAdminRequirements}>
              <Button variant="outline" className="flex w-full">
                <BanknotesIcon className="ml-2 size-5" />
                <span>افزایش شارژ حساب</span>
              </Button>
            </Link>
          )}
          {isAdmin && (
            <Link className="flex" href="/setting">
              <Button variant="outline" className="flex w-full">
                <Cog6ToothIcon className="ml-2 size-5" />
                <span>تنظیمات</span>
              </Button>
            </Link>
          )}
          {data.userPackages?.map((userPackage) => (
            <Stat key={userPackage.id} pack={userPackage} onRenewClick={handleBuyPackageClick} />
          ))}

          {!isRegisteredInTelegram && (data.userPackages.length > 0 || isAdmin) && (
            <a className="block" href={botRef}>
              <Button variant="outline" className="flex w-full">
                <TelegramIcon className="ml-2 size-5" />
                <span>{registerToBotText}</span>
              </Button>
            </a>
          )}
          <div className="flex flex-row-reverse space-x-4">
            {me.data?.me.parent?.telegram?.username && (
              <a
                target="_blank"
                rel="noreferrer"
                className="flex w-full"
                href={`https://t.me/${me.data?.me.parent?.telegram?.username}`}
              >
                <Button variant="outline" className="flex w-full">
                  <ChatBubbleOvalLeftIcon className="ml-2 size-5" />
                  <span>پشتیبانی تلگرام</span>
                </Button>
              </a>
            )}
            {hasPackage && (
              <Link className="flex w-full" href="/help">
                <Button variant="outline" className="flex w-full">
                  <InformationCircleIcon className="ml-2 size-5" />
                  <span>آموزش اتصال</span>
                </Button>
              </Link>
            )}
          </div>
          <UpdateMessagePopup />
          <FreePackageBottomSheet
            isOpen={isFreePackageBottomSheetOpen}
            onClose={() => setFreePackageBottomSheetOpen(false)}
            freePackage={enableTodayFreePackageData.data?.enableTodayFreePackage}
            promotionCode={
              me.data.me.promotion?.length
                ? me.data.me.promotion[0].code
                : removeWWW(window.location.host) === "vaslshim.com"
                  ? "save"
                  : "vvip"
            }
          />
        </div>
      </div>
    );
  }
};

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname !== window.location.pathname) {
      const idPattern = /^\/([\w-]+)$/;

      const match = window.location.pathname.match(idPattern);

      if (match) {
        const promoCode = match[1]; // Extract the alphanumeric id part
        router.replace({
          pathname: "/[promoCode]",
          query: { promoCode },
        });
      } else {
        router.replace(window.location.pathname); // Directly replace for other paths
      }
    }
  }, [router]);

  // // Only render the HomePageContent if the current route is "/"
  if (window.location.pathname !== "/") {
    return null;
  }

  return <HomePageComponent />;
};

export default HomePage;

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
