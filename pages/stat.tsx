import Head from "next/head"
import React from "react"
import { GetStat } from "../components/GetStat/GetStat"

export default function Web() {
  return (
    <>
      <Head>
        <meta property="og:url" content="https://arvanvpn.online/" />
        <meta
          property="og:image"
          content="https://cdn5.vectorstock.com/i/1000x1000/15/34/fast-icon-vector-26611534.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Optinet Panel</title>
      </Head>
      <GetStat />
    </>
  )
}
