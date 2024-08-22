// import localFont from "next/font/local"
import Head from 'next/head'
import { Toaster } from "@/components/ui/toaster"

// import styles from './layout.module.css'

type LayoutProps = {
  children: React.ReactNode
}

// const iranSans = localFont({ src: "../../assets/fonts/IRANSansWeb.woff2" })

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>وصل کن دات کام | Vaslkon.com</title>
        <meta name="description" content="سایت وصل کن دات کام (vaslkon.com) با کیفیت‌ترین سرورها." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <main>
        {children}
        <Toaster />
      </main>
    </>
  )
}
