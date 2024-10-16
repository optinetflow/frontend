import { CheckCheck, CircleDollarSign, SlidersHorizontal, UserIcon } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import type { NextPageWithLayout } from "./_app"
import FilterBottomSheet from "../components/FIlterBottomSheet/FilterBottomSheet"
import Layout from "../components/Layout/Layout"

import QuickFilter, { Filter } from "../components/quickFilter/QuickFilter"
import SkeletonPackage from "../components/SkeletonPackage/SkeletonPackage"
import UpdateMessagePopup from "../components/UpdateMessagePopup/UpdateMessagePopup"
import { useGetPackagesQuery } from "../graphql/queries/packages.graphql.interface"
import { convertPersianCurrency, formatDuration } from "../helpers"
import { ArrowUTurnLeftIcon } from "../icons"
import { PackageCategory } from "../src/graphql/__generated__/schema.graphql"

const PackagesPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams()
  const userPackageId = searchParams.get("userPackageId")
  const router = useRouter()
  const [quickFilter, setQuickFilter] = useState<Filter>({})
  const [bottomSheetFilters, setBottomSheetFilters] = useState<Filter[]>([])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const {
    data: packagesData,
    refetch: refetchUserPackages,
    loading,
    error,
  } = useGetPackagesQuery({
    variables: { input: { category: null } },
    fetchPolicy: "cache-and-network",
  })

  const quickFilterOptions: Filter[] = [
    {
      text: "فیلترها",
      key: null,
      value: null,
      toggleAllFilters: true,
      icon: <SlidersHorizontal className="mr-1 size-4" />,
    },
    { text: "بسیار با کیفیت", key: "category", value: "QUALITY" },
    { text: "بسته های اقتصادی", key: "category", value: "ECONOMIC" },
  ]

  useEffect(() => {
    const { value, key, toggleAllFilters } = quickFilter

    if (toggleAllFilters === true) {
      setIsFiltersOpen(true)
    } else if (key && value) {
      const quickFilterObject = { [key]: value }
      refetchUserPackages({ input: quickFilterObject })
    }
  }, [quickFilter, refetchUserPackages])

  useEffect(() => {
    if (bottomSheetFilters.length > 0) {
      const filtersObject = bottomSheetFilters.reduce((acc: Record<string, any>, filter: Filter) => {
        if (filter.key) {
          acc[filter.key] = filter.value
        }
        return acc
      }, {})

      refetchUserPackages({ input: filtersObject })
    }
  }, [bottomSheetFilters, refetchUserPackages])

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
          <QuickFilter filter={quickFilter} setFilter={setQuickFilter} filters={quickFilterOptions} />
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
              className="mb-4 flex h-36 w-full items-center justify-between rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-4 shadow-lg transition-transform hover:scale-105"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-extrabold text-gray-900">
                    {pack.traffic} گیگ {formatDuration(pack.expirationDays)}
                  </span>
                  {pack.traffic === 30 && (
                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-600">پرتقاضا</span>
                  )}
                  {pack.traffic === 100 && (
                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-600">خانواده</span>
                  )}
                </div>
                <span className="flex items-center text-sm text-gray-600">
                  <UserIcon className="mr-1 size-4" /> چند کاربره
                </span>

                {pack.category === PackageCategory.Quality && (
                  <span className="mt-2 flex items-center text-sm font-semibold text-blue-800">
                    <CheckCheck className="mr-1 size-4 text-blue-500" /> کیفیت بسیار بالا
                  </span>
                )}
                {pack.category === PackageCategory.Economic && (
                  <span className="mt-2 flex items-center text-sm font-semibold text-teal-700">
                    <CircleDollarSign className="mr-1 size-4 text-teal-700" /> اقتصادی
                  </span>
                )}

                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-700">{convertPersianCurrency(pack.price)}</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center rounded-full bg-blue-600 px-6 py-2 text-sm text-white shadow-lg hover:bg-blue-700">
                  خرید
                </div>
              </div>
            </Link>
          ))
        )}
        <FilterBottomSheet
          setFilter={setBottomSheetFilters}
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
        />
      </div>
      <UpdateMessagePopup />
      <div></div>
    </div>
  )
}

export default PackagesPage

PackagesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
