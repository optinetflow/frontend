import Image from "next/image"
import Link from "next/link"
import { ArrowUTurnLeftIcon } from "icons"
import { NextPageWithLayout } from "./_app"
import { Button } from "../components/Button/Button"
import Layout from "../components/Layout/Layout"
import router from "next/router"

// Example data: Array of package categories
const packages = [
  {
    id: "ECONOMIC",
    title: "بسته های اقتصادی",
    description:
      "طراحی شده برای کاربرانی که به دنبال سرعت و قیمت مناسب هستند. این بسته‌ها تجربه‌ای متعادل از سرعت و هزینه را ارائه می‌دهند.",
    image: "/images/economic.webp", // Image path
  },
  {
    id: "QUALITY",
    title: "بسته های پرسرعت",
    description:
      "برای کاربرانی که به دنبال بالاترین سرعت اینترنت هستند. این بسته‌ها تجربه‌ای سریع و بدون توقف را فراهم می‌کنند.",
    image: "/images/diamond2.webp", // Replace with actual image path
  },
  // Add more packages as needed
]

const PackageCategoriesPage: NextPageWithLayout = () => {
  return (
    <div className="mx-auto my-12 flex min-h-screen max-w-xs flex-col items-center justify-center">
      <div className="sticky top-0 z-10 mb-4 w-full bg-white p-2">
        <button
          onClick={() => router.back()}
          className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <ArrowUTurnLeftIcon className="ml-1 size-4" />
          <span>بازگشت</span>
        </button>
      </div>
      {packages.map((pack) => (
        <div
          key={pack.id}
          className="mb-4 w-full max-w-sm rounded-lg border border-gray-200 bg-slate-50 p-4 shadow hover:bg-slate-100"
        >
          <div className="relative h-64 w-full">
            <Image
              className="rounded-t-lg"
              src={pack.image} // Dynamic image path
              alt={pack.title}
              layout="fill" // This makes the image take up the full container
              objectFit="cover" // Ensures the image covers the entire card
            />
          </div>
          <div className="mt-3">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{pack.title}</h5>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{pack.description}</p>
          </div>
          {/* Full width button */}
          <Link href={`/packages?category=${pack.id}`}>
            <button className="mt-4 w-full rounded-lg bg-slate-800 px-5 py-2.5 text-center text-white hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300">
              مشاهده بسته ها
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default PackageCategoriesPage

PackageCategoriesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
