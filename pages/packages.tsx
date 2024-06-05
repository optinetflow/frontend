import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useMeQuery } from "../graphql/queries/me.graphql.interface"
import React from "react"
import { ceilTo } from '../helpers';

import { Button } from "@/components/ui/button"


import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"

import { useGetPackagesQuery } from "../graphql/queries/packages.graphql.interface"
import { convertPersianCurrency } from "../helpers"
import { ArrowUTurnLeftIcon } from "../icons"

const PackagesPage: NextPageWithLayout = () => {
  const packages = useGetPackagesQuery({ fetchPolicy: "cache-and-network" })
  const searchParams = useSearchParams()
  const me = useMeQuery({ fetchPolicy: "cache-and-network" });
  const userPackageId = searchParams.get("userPackageId")
  const router = useRouter()

  const filteredPackages = me.data?.me.parent?.id === '801d871d-879a-4ad0-9e8c-a5577ffd682d' ? packages.data?.packages.filter(pack => {
    if ([20, 50, 40].includes(pack.traffic)) return false;
    return true;
  }).map((pack) => {
    return ({...pack,  price: ceilTo(pack.price * 0.7, 0)})
  }): packages.data?.packages;

  return (
    <div className="mx-auto my-12 flex max-w-xs flex-col justify-center" style={{ minHeight: "calc(100vh - 6rem)" }}>
      <div className="w-full space-y-4">
        <Button variant="secondary" className="flex w-full" onClick={router.back}>
          <ArrowUTurnLeftIcon className="ml-2 h-5 w-5" />
          <span>بازگشت</span>
        </Button>
        {filteredPackages?.map((pack) => (
          <Link
            href={
              userPackageId ? `/renew-package/${pack.id}?userPackageId=${userPackageId}` : `/buy-package/${pack.id}`
            }
            key={pack.id}
            className="mb-4 flex h-32 w-full items-center justify-between rounded-lg bg-slate-50 p-4 hover:bg-slate-100"
          >
            <div className="flex h-full flex-col items-start justify-between">
              <span className=" ltr text-4xl text-slate-800">{pack.traffic} GB </span>
              <span className=" rounded-sm  text-xs text-slate-400">{pack.expirationDays} روزه | چند کاربره{pack.traffic === 30 ? <span className="text-red-800"> | پرطرفدار</span> : ''}{pack.traffic === 100 ? <span className="text-red-800"> | خانواده</span> : ''}</span>
              <span className=" text-lg text-slate-600">{convertPersianCurrency(pack.price)}</span>
            </div>

            <div className="rounded-full bg-slate-800 px-6 py-2 text-sm text-slate-100 hover:bg-slate-950">خرید</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PackagesPage

PackagesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
