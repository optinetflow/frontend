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
    error,
  } = useGetPackagesQuery({
    variables: { input: { category: filter.value as PackageCategory } }, // Pass the filter as a variable
    fetchPolicy: "cache-and-network",
  })

  const filters: Filter[] = [
    { text: "بسیار با کیفیت", key: "category", value: "QUALITY" },
    { text: "بسته های اقتصادی", key: "category", value: "ECONOMIC" },
  ]

  useEffect(() => {
    const { value } = filter
    refetchUserPackages({ input: { category: value as PackageCategory } })
  }, [filter, refetchUserPackages])

  return (
    <div className="mx-auto my-12 flex max-w-xs flex-col" style={{ minHeight: "calc(100vh - 6rem)" }}>
      <div className="w-full space-y-4">
        <div className="sticky top-0 z-10 border-b border-gray-300 bg-white pt-2">
          <div className="flex items-center justify-between">
            <Button variant="secondary" className="top-3 mb-3 flex w-full" onClick={router.back}>
              <ArrowUTurnLeftIcon className="ml-2 size-5" />
              <span>بازگشت</span>
            </Button>
          </div>
          <QuickFilter filter={filter} setFilter={setFilter} filters={filters} />
        </div>

        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <SkeletonPackage key={index} />)
        ) : error ? (
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
              className="mb-4 flex h-36 w-full items-center justify-between rounded-lg bg-white p-4 shadow-lg transition-shadow duration-300 hover:bg-gray-50 hover:shadow-xl"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-4xl font-bold text-gray-900">{pack.traffic} GB</span>
                  {pack.traffic === 30 && (
                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">پرتقاضا</span>
                  )}
                  {pack.traffic === 100 && (
                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">خانواده</span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{pack.expirationDays} روزه | چند کاربره</span>
                {pack.category === PackageCategory.Quality && (
                  <span className="mt-2 text-sm font-semibold text-blue-800">کیفیت بسیار بالا</span>
                )}
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-700">{convertPersianCurrency(pack.price)}</span>
                  {pack.category === PackageCategory.Economic && (
                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">اقتصادی</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-1 rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
                  {pack.expirationDays <= 30 && "1 ماهه"}
                  {pack.expirationDays > 30 && pack.expirationDays <= 60 && "2 ماهه"}
                  {pack.expirationDays > 60 && "3 ماهه"}
                </div>
                <div className="rounded-full bg-gray-800 px-6 py-2 text-sm text-white transition-colors hover:bg-gray-900">
                  خرید
                </div>
              </div>
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
