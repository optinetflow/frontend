import Head from "next/head"
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/toaster"
import { GetBrandInfoQueryResult } from "../../graphql/queries/getBrandInfo.graphql.interface"
import { removeWWW } from "../../helpers"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [meta, setMeta] = useState({
    title: "در حال بارگذاری...",
    description: "در حال بارگذاری اطلاعات، لطفاً صبر کنید...",
  })

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const query = `
            query getBrandInfo($input: GetBrandInfoInput!) {
              getBrandInfo(input: $input) {
                id
                title
                description
                logo
              }
            }
          `

        const variables = {
          input: {
            domainName: removeWWW(window.location.host),
          },
        }

        const response = await fetch(`${document.location.origin}${process.env.NEXT_PUBLIC_GRAPHQL_URI}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        })
        const data = (await response.json()) as GetBrandInfoQueryResult
        if (data.data?.getBrandInfo.title && data.data?.getBrandInfo.description) {
          setMeta({
            title: data.data?.getBrandInfo.title,
            description: data.data?.getBrandInfo.description,
          })
        }
      } catch (error) {
        console.error("Error fetching meta data:", error)
      }
    }

    fetchMeta()
  }, [])

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <main>
        {children}
        <Toaster />
      </main>
    </>
  )
}
