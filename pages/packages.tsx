import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import type { NextPageWithLayout } from "./_app";
import FilterBottomSheet from "../components/FIlterBottomSheet/FilterBottomSheet";
import Layout from "../components/Layout/Layout";

import QuickFilter, { Filter } from "../components/quickFilter/QuickFilter";
import SkeletonPackage from "../components/SkeletonPackage/SkeletonPackage";
import { useGetPackagesQuery } from "../graphql/queries/packages.graphql.interface";
import { formatDuration, toIRR } from "../helpers";
import { ArrowUTurnLeftIcon } from "../icons";
import { PackageCategory } from "../src/graphql/__generated__/schema.graphql";

const PackagesPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const userPackageId = searchParams.get("userPackageId");
  const category = searchParams.get("category");
  const router = useRouter();
  const [quickFilter, setQuickFilter] = useState<Filter>({});
  const [bottomSheetFilters, setBottomSheetFilters] = useState<Filter[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const {
    data: packagesData,
    refetch: refetchUserPackages,
    loading,
    error,
  } = useGetPackagesQuery({
    variables: { input: { category: category as PackageCategory } },
    fetchPolicy: "cache-and-network",
  });

  const quickFilterOptions: Filter[] = [
    // {
    //   text: "فیلترها",
    //   key: null,
    //   value: null,
    //   toggleAllFilters: true,
    //   icon: <SlidersHorizontal className="mr-1 size-4" />,
    // },
    { text: "ماهانه", key: "expirationDays", value: 30 },
    { text: "سه ماهه", key: "expirationDays", value: 90 },
  ];

  useEffect(() => {
    const { value, key, toggleAllFilters } = quickFilter;
    if (toggleAllFilters === true) {
      setIsFiltersOpen(true);
    } else if (key && value) {
      const quickFilterObject = { [key]: value, category: category as PackageCategory };
      refetchUserPackages({ input: quickFilterObject });
    } else if (!key && !value && !toggleAllFilters) {
      refetchUserPackages({ input: { category: category as PackageCategory } });
    }
  }, [quickFilter, refetchUserPackages, category]);

  const handleBack = () => {
    router.replace("/package-categories");
  };

  useEffect(() => {
    if (bottomSheetFilters.length > 0) {
      const filtersObject = bottomSheetFilters.reduce((acc: Record<string, any>, filter: Filter) => {
        if (filter.key) {
          acc[filter.key] = filter.value;
        }
        return acc;
      }, {});

      refetchUserPackages({ input: filtersObject });
    }
  }, [bottomSheetFilters, refetchUserPackages]);

  return (
    <div className="mx-auto my-12 flex max-w-xs flex-col" style={{ minHeight: "calc(100vh - 6rem)" }}>
      <div className="w-full space-y-4">
        <div className="sticky top-0 z-10 border-gray-300 bg-white pt-2">
          <div className="flex items-center justify-between">
            <Button variant="secondary" className="top-3 flex w-full" onClick={handleBack}>
              <ArrowUTurnLeftIcon className="ml-2 size-5" />
              <span>بازگشت</span>
            </Button>
          </div>
          <QuickFilter className="mt-4" filter={quickFilter} setFilter={setQuickFilter} filters={quickFilterOptions} />
        </div>

        {loading && !packagesData ? (
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
              className="mb-4 flex h-32 w-full items-center justify-between rounded-lg bg-slate-50 p-4 hover:bg-slate-100"
            >
              <div className="flex h-full flex-col items-start justify-between">
                <div className="flex items-center">
                  <span className="text-lg font-extrabold text-gray-900">
                    {pack.traffic} گیگ {formatDuration(pack.expirationDays)}
                  </span>
                  <span className="mr-2 rounded bg-slate-400 px-1 py-0.5 text-[10px] text-white">
                    {pack.category === PackageCategory.Quality ? "ویژه" : ""}
                    {pack.category === PackageCategory.Economic ? "اقتصادی" : ""}
                  </span>
                </div>

                <span className="rounded-sm text-xs text-slate-400">
                  چند کاربره
                  {pack.traffic === 30 ? <span className="text-red-800"> | پرطرفدار</span> : ""}
                  {pack.traffic === 100 ? <span className="text-red-800"> | خانواده</span> : ""}
                </span>
                <div className="flex flex-row-reverse items-center space-x-2">
                  {pack.discountedPrice ? (
                    <>
                      <span className=" text-lg text-slate-600">{toIRR(pack.discountedPrice)}</span>
                      <span className="text-sm text-slate-400 line-through">{toIRR(pack.price, "number")}</span>
                    </>
                  ) : (
                    <span className=" text-lg text-slate-600">{toIRR(pack.price)}</span>
                  )}
                </div>
              </div>

              <div className="rounded-full bg-slate-800 px-6 py-2 text-sm text-slate-100 hover:bg-slate-950">خرید</div>
            </Link>
          ))
        )}
        <FilterBottomSheet
          setFilter={setBottomSheetFilters}
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
        />
      </div>
      <div></div>
    </div>
  );
};

export default PackagesPage;

PackagesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
