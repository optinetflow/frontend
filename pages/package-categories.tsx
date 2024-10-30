import Link from "next/link"
import { useRouter } from "next/router"
import { ArrowUTurnLeftIcon } from "icons"
import { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"
import { useSearchParams } from "next/navigation"

const packageCategories = [
  {
    id: "ECONOMIC",
    title: "بسته های اقتصادی",
    description: "برای کاربرانی که به دنبال سرعت خوب و قیمت مناسب هستند.",
  },
  {
    id: "QUALITY",
    title: "بسته های ویژه",
    description: "بسته‌های ویژه مخصوص افرادی است که کیفیت و سرعت بالا برایشان حیاتی است.",
  },
]

const PackageCategoriesPage: NextPageWithLayout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userPackageId = searchParams.get("userPackageId")
  return (
    <div
      className="mx-auto my-12 flex min-h-screen max-w-xs flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="sticky top-0 z-10 mb-4 w-full bg-white p-2">
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
  )
}

export default PackageCategoriesPage

PackageCategoriesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
