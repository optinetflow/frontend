import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "@/components/ui/button";
import Layout from "../../components/Layout/Layout";
import { ArrowDownTrayIcon, ArrowUTurnLeftIcon } from "../../icons";

import type { NextPageWithLayout } from "../_app";

const IOSPage: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <div
      className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-4"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="w-full space-y-4">
        <p>۱. برنامه Foxray را از اپ استور نصب کنید:</p>
        <a target="_blank" rel="noreferrer" className="flex" href="https://apps.apple.com/us/app/foxray/id6448898396">
          <Button variant="outline" className="flex w-full">
            <ArrowDownTrayIcon className="ml-2 h-5 w-5" />
            <span>برنامه Foxray</span>
          </Button>
        </a>

        <p className="pt-8">۲. لینک بسته را از سایت کپی کنید:</p>
        <Image
          width={750}
          height={1751}
          alt="How to copy link"
          src="https://vaslkon.com/file/optinetflow/asset/copy-link-2.jpg"
        />

        <p className="pt-8">۳. لینک را وارد برنامه کنید</p>
        <Image
          width={459}
          height={334}
          alt="How to paste in Foxray"
          src="https://vaslkon.com/file/optinetflow/asset/foxray-paste-link-1.png"
        />

        <p className="py-8">
          ۴. در صورت پرسش Allow paste را بزنید. بسته‌ی شما اضافه شده و می‌توانید با کلیک روی آیکن ▶ به آن وصل شوید.
        </p>

        <Button variant="secondary" className="flex w-full" onClick={router.back}>
          <ArrowUTurnLeftIcon className="ml-2 h-5 w-5" />
          <span>بازگشت</span>
        </Button>
      </div>
    </div>
  );
};

export default IOSPage;

IOSPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
