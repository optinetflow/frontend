// import localFont from "next/font/local"
// import Head from 'next/head'
import { Toaster } from "@/components/ui/toaster"

// import styles from './layout.module.css'

type LayoutProps = {
  children: React.ReactNode
}

// const iranSans = localFont({ src: "../../assets/fonts/IRANSansWeb.woff2" })

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main>
        {children}
        <Toaster />
      </main>
    </>
  )
}
