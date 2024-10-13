import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"


import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"

import QuickFilter, { Filter } from "../components/quickFilter/QuickFilter"
import SkeletonPackage from "../components/SkeletonPackage/SkeletonPackage"
import { useGetPackagesQuery } from "../graphql/queries/packages.graphql.interface"
import { convertPersianCurrency } from "../helpers"
import { ArrowUTurnLeftIcon } from "../icons"
import { PackageCategory } from "../src/graphql/__generated__/schema.graphql"

const PackagesPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams()
  const userPackageId = searchParams.get("userPackageId")
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>({ key: null, value: null, text: null })

  const { 
    data: packagesData, 
    refetch: refetchUserPackages, 
    loading,
    error
  } = useGetPackagesQuery({
    variables: { input: {category: filter.value as PackageCategory} }, // Pass the filter as a variable
    fetchPolicy: "cache-and-network"
  });

  const filters: Filter[] = [
    { text: "بسیار با کیفیت", key: "category", value: "QUALITY" },
    { text: "بسته های اقتصادی", key: "category", value: "ECONOMIC" },
  ]

  useEffect(() => {
    const { value } = filter;
    refetchUserPackages({input: {category: value as PackageCategory}});
  }, [filter, refetchUserPackages]);


  return (
    <div className="mx-auto my-12 flex max-w-xs flex-col" style={{ minHeight: "calc(100vh - 6rem)" }}>
      <div className="w-full space-y-4">
     
      <div className="sticky top-0 z-10 bg-white border-b border-gray-300 pt-2">
        <div className="flex justify-between items-center">
          <Button variant="secondary" className="flex w-full mb-3 top-3" onClick={router.back}>
            <ArrowUTurnLeftIcon className="ml-2 size-5" />
            <span>بازگشت</span>
          </Button>
        </div>
        <QuickFilter filter={filter} setFilter={setFilter} filters={filters} />
      </div>

        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonPackage key={index} />
          ))) : error ?  (
            <div className="text-center text-red-600">خطایی در بارگذاری بسته‌ها پیش آمد.</div>
          ) : packagesData?.packages && packagesData.packages.length === 0 ? (
            <div className="text-center text-gray-600">بسته‌ای یافت نشد.</div>
          ) : (
          packagesData?.packages?.map((pack) => (
            <Link
              href={
                userPackageId ? `/renew-package/${pack.id}?userPackageId=${userPackageId}` : `/buy-package/${pack.id}`
              }
              key={pack.id}
              className="mb-4 flex h-32 w-full items-center justify-between rounded-lg bg-slate-50 p-4 hover:bg-slate-100"
            >
              <div className="flex h-full flex-col items-start justify-between">
                <span className=" ltr text-4xl text-slate-800">{pack.traffic} GB </span>
                <span className="rounded-sm text-xs text-slate-400">
                  {pack.expirationDays} روزه | چند کاربره
                  {pack.traffic === 30 && <span className="text-red-800"> | پرطرفدار</span>}
                  {pack.traffic === 100 && <span className="text-red-800"> | خانواده</span>}
                </span>
                {pack.category === PackageCategory.Quality && (
                    <span className="text-blue-800 font-bold">کیفیت بسیار بالا</span>
                )}
                <span className=" text-lg text-slate-600 font-bold">{convertPersianCurrency(pack.price)} {pack.category === PackageCategory.Economic ? "(اقتصادی)": ""}</span>
              </div>
  
              <div className="rounded-full bg-slate-800 px-6 py-2 text-sm text-slate-100 hover:bg-slate-950">خرید</div>
            </Link>
          ))
        )}
       
      </div>
    </div>
  )
}

export default PackagesPage

PackagesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
