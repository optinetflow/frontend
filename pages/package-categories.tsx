import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { ArrowUTurnLeftIcon } from "icons";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout/Layout";
import { useMeQuery } from "../graphql/queries/me.graphql.interface";
import { useUserPackagesQuery } from "../graphql/queries/userPackages.graphql.interface";
import { Role } from "../src/graphql/__generated__/schema.graphql";

const packageCategories = [
  {
    id: "ECONOMIC",
    title: "بسته های اقتصادی",
    description: "برای کاربرانی که به دنبال سرعت خوب و قیمت مناسب هستند.",
  },
  {
    id: "QUALITY",
    title: "بسته های ویژه",
    description: "برای کاربرانی که کیفیت و سرعت بسیار بالا برایشان حیاتی است.",
  },
];

const PackageCategoriesPage: NextPageWithLayout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: packages } = useUserPackagesQuery({ fetchPolicy: "cache-first" });
  const { data: me } = useMeQuery({ fetchPolicy: "cache-only" });

  const userPackageId = searchParams.get("userPackageId");
  return (
    <div
      className="mx-auto my-12 flex min-h-screen max-w-xs flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      {/* Warning Message for resellers */}
      {me && me.me.role === Role.Admin && packages && packages?.userPackages.length > 20 && (
        <div className="mb-4 w-full">
          <div className="rounded-md bg-yellow-100 p-4">
            <div className="flex">
              <div className="flex-1">
                <div className="flex items-center">
                  <AlertCircle className="size-5 text-yellow-400" aria-hidden="true" />
                  <h3 className="mr-1 text-lg font-bold text-yellow-800">نمایندگان فروش، توجه کنید! ⚠️</h3>
                </div>
                <p className="mt-2 text-sm text-yellow-700">
                  شما می‌توانید حداکثر ۲۰ بسته داشته باشید و بهتر است مشتری‌ها رو مستقیم به سیستم اضافه کنید. این کار
                  درآمد و زمان شما رو بهینه می‌کنه!
                </p>
                <div className="mt-2 text-center">
                  <Link
                    href="/resellers-policies"
                    className="inline-flex items-center rounded-lg text-sm font-semibold text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    aria-label="بیشتر درباره سیاست‌های نمایندگان فروش"
                  >
                    <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                    بیشتر بخوانید 🚀
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Warning Message for users */}
      {me && me.me.role === Role.User && packages && packages?.userPackages.length > 5 && (
        <div className="mb-4 w-full">
          <div className="rounded-md bg-yellow-100 p-4">
            <div className="flex">
              <div className="flex-1">
                <div className="flex items-center">
                  <AlertCircle className="size-5 text-yellow-400" aria-hidden="true" />
                  <h3 className="mr-1 text-lg font-bold text-yellow-800">توجه! ⚠️</h3>
                </div>
                <p className="mt-2 text-sm text-yellow-700">
                  شما می‌توانید حداکثر ۵ بسته خریداری کنید. برای خرید بیشتر، لطفاً با پشتیبانی تماس بگیرید تا درخواست
                  شما بررسی شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sticky top-0 z-10 mb-4 w-full bg-white">
        <button
          onClick={() => router.push("/")}
          className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <ArrowUTurnLeftIcon className="ml-1 size-4" />
          <span>بازگشت</span>
        </button>
      </div>
      {packageCategories.map((category) => (
        <Link
          href={`/packages?category=${category.id}${userPackageId ? `&userPackageId=${userPackageId}` : ""}`}
          key={category.id}
          className="mb-4 flex h-32 w-full items-center justify-between rounded-lg bg-slate-50 p-5 hover:bg-slate-100"
        >
          <div className="flex h-full flex-col items-start">
            <h2 className="flex items-center text-lg font-extrabold text-gray-900">{category.title}</h2>
            <p className="mt-4 rounded-sm text-slate-400">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PackageCategoriesPage;

PackageCategoriesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
