import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Layout from "../../components/Layout/Layout"
import { useUpdateChildMutation } from "../../graphql/mutations/updateChild.graphql.interface"
import { useChildrenQuery } from "../../graphql/queries/children.graphql.interface"
import { faNumToEn } from "../../helpers"
import { UpdateChildInput } from "../../src/graphql/__generated__/schema.graphql"
import type { NextPageWithLayout } from "../_app"

const CustomerEditPage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query?.customerId as string
  const [updateChild, updateChildData] = useUpdateChildMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateChildInput>()
  const customers = useChildrenQuery({ fetchPolicy: "cache-only" })
  const customer = customers.data?.children.find((child) => child.id === id)
  console.log("customer ===>", customer)

  const onSubmit = handleSubmit((data) => {
    updateChild({
      variables: {
        input: {
          ...Object.keys(data).reduce(
            (all, key) => ({ ...all, [key]: data[key as keyof UpdateChildInput] || undefined }),
            {}
          ),
          childId: id,
        },
      },
    })
      .then(() => {
        router.back()
      })
      .catch((e) => {
        console.error(e)
      })
  })

  const firstError = Object.keys(errors)?.[0] as keyof UpdateChildInput
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-4"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="space-y-2">
        <Label htmlFor="firstname">نام</Label>
        <Input defaultValue={customer?.firstname} {...register("firstname")} id="firstname" required type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastname">نام خانوادگی</Label>
        <Input defaultValue={customer?.lastname} {...register("lastname")} id="lastname" required type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">شماره موبایل</Label>
        <Input
          defaultValue={customer?.phone}
          {...register("phone", {
            setValueAs: faNumToEn,
            pattern: { value: /^9\d{9}$/, message: "شماره موبایل را بدون صفر وارد کنید." },
          })}
          className="ltr"
          id="phone"
          placeholder="912XXXXXXX"
          required
          type="tel"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">تغییر رمز عبور</Label>
        <Input
          {...register("password", { minLength: { value: 4, message: "رمز باید حداقل ۴ حرف باشد." } })}
          className="ltr"
          id="password"
          type="password"
        />
      </div>

      <div className=" text-sm text-red-600">
        {errors?.[firstError]?.message || (updateChildData.error && "این شماره موبایل قبلا ثبت نام کرده است.")}&nbsp;
      </div>
      <Button disabled={updateChildData?.loading} className="w-full" type="submit">
        {updateChildData?.loading ? "لطفا کمی صبر کنید..." : "اعمال تغییرات"}
      </Button>
    </form>
  )
}

export default CustomerEditPage

CustomerEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
