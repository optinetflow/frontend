import Image from 'next/image'
import { useRouter } from "next/router"
import React from "react"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Layout/Layout"
import { ArrowDownTrayIcon, ArrowUTurnLeftIcon } from "../../icons"

import type { NextPageWithLayout } from "../_app"


const AndroidPage: NextPageWithLayout = () => {
  const router = useRouter()
  return (
    <div
      className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-4"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="w-full space-y-4">
        <p>۱. برنامه V2rayNG را دانلود و نصب کنید:</p>
        <a
          rel="noreferrer"
          className="flex"
          href="https://github.com/2dust/v2rayNG/releases/download/1.8.19/v2rayNG_1.8.19.apk"
          download
        >
          <Button variant="outline" className="flex w-full">
            <ArrowDownTrayIcon className="ml-2 h-5 w-5" />
            <span>برنامه V2rayNG</span>
          </Button>
        </a>

        <p className='pt-8'>۲. لینک بسته را از سایت کپی کنید:</p>
        <Image width={750} height={1751} alt="How to copy link" src="https://vaslkon.com/file/optinetflow/asset/copy-link-2.jpg" />

        <p className='pt-8'>۳. وارد برنامه شوید و دکمه + را بزنید:</p>
        <Image width={1080} height={453} alt="Click on + btn in V2rayng" src="https://vaslkon.com/file/optinetflow/asset/v2rayng-plus-btn.jpg" />

        <p className='pt-8'>۴. روی گزینه‌ی Import config from Clipboard بزنید تا بسته اضافه شود:</p>
        <Image width={1080} height={1353} alt="How to copy link" src="https://vaslkon.com/file/optinetflow/asset/v2rayng-paste-link.jpg" />


        <p className='py-8'>۵. ابتدا روی بسته‌ای که اضافه شد بزنید تا فعال شود سپس با کلیک روی دکمه‌ی زیر وصل شوید.</p>
        <Image width={1080} height={2400} alt="How to copy link" src="https://vaslkon.com/file/optinetflow/asset/v2rayng-connect.jpg" />

        <Button variant="secondary" className="flex w-full" onClick={router.back}>
          <ArrowUTurnLeftIcon className="ml-2 h-5 w-5" />
          <span>بازگشت</span>
        </Button>
      </div>
    </div>
  )
}

export default AndroidPage

AndroidPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
