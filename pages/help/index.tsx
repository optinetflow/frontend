import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "@/components/ui/button";
import Layout from "../../components/Layout/Layout";
import { AndroidIcon, ArrowUTurnLeftIcon, IosIcon } from "../../icons";
import type { NextPageWithLayout } from "../_app";

const HelpPage: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <div
      className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-4"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="w-full space-y-4">
        <Link className="flex" href="/help/android">
          <Button variant="outline" className="flex w-full">
            <AndroidIcon className="ml-2 h-5 w-5" />
            <span>اندروید</span>
          </Button>
        </Link>
        <Link className="flex" href="/help/ios">
          <Button variant="outline" className="flex w-full">
            <IosIcon className="ml-2 h-5 w-5" />
            <span>آی او اس (اپل)</span>
          </Button>
        </Link>
        <Button variant="ghost" className="flex w-full" onClick={router.back}>
          <ArrowUTurnLeftIcon className="ml-2 h-5 w-5" />
          <span>بازگشت</span>
        </Button>
      </div>
    </div>
  );
};

export default HelpPage;

HelpPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
