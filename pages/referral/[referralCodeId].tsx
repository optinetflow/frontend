import { useChildrenQuery } from "graphql/queries/children.graphql.interface"
import { NextPageWithLayout } from "../_app"
import Layout from "../../components/Layout/Layout"
import Link from "next/link"

const TestPage: NextPageWithLayout = () => {
    const { data } = useChildrenQuery({ fetchPolicy: "cache-and-network" })
  
    if (data) {
      return (
        <div className="mx-auto my-12 flex max-w-xs flex-col justify-center" style={{ minHeight: "calc(100vh - 6rem)" }}>
          <div className="w-full space-y-4">
          <span>ثبت نام</span>
          </div>
        </div>
      )
    }
  }
  
  export default TestPage
  
  TestPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
  }
  