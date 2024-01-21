import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"
import { useUpdateUserMutation } from "../graphql/mutations/updateUser.graphql.interface"
import { useMeQuery } from "../graphql/queries/me.graphql.interface"
import { faNumToEn } from "../helpers"
import { UpdateUserInput } from "../src/graphql/__generated__/schema.graphql"

const SettingPage: NextPageWithLayout = () => {
  const router = useRouter()
  const me = useMeQuery({ fetchPolicy: "cache-only" })
  const bankCard = me?.data?.me.bankCard?.[0];
  const [updateUser, updateUserData] = useUpdateUserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInput>();

  const onSubmit = handleSubmit((data) => {
    updateUser({
      variables: {
        input: data,
      },
    })
      .then(() => {
        router.back()
      })
      .catch((e) => {
        console.error(e)
      })
  })

  const firstError = Object.keys(errors)?.[0] as keyof UpdateUserInput
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-4"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="space-y-2">
        <Label htmlFor="cardBandName">نام مالک کارت بانکی</Label>
        <Input defaultValue={bankCard?.name} {...register("cardBandName", { required: "لطفا نام مالک کارت بانکی را وارد کنید."})} id="cardBandName" type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cardNumber">شماره کارت:</Label>
        <Input
          defaultValue={bankCard?.number || undefined}
          {...register("cardBandNumber", {
            setValueAs: faNumToEn,
            pattern: { value: /^\d{16}$/, message: "شماره کارت را بدون فاصله وارد کنید." },
          })}
          className="ltr"
          id="cardBandNumber"
          placeholder="شماره ۱۶ رقمی کارت"
          required
        />
      </div>

      <div className=" text-sm text-red-600">
        {errors?.[firstError]?.message || (updateUserData.error && "خطای سرور")}&nbsp;
      </div>
      <Button disabled={updateUserData?.loading} className="w-full" type="submit">
        {updateUserData?.loading ? "لطفا کمی صبر کنید..." : "اعمال تغییرات"}
      </Button>
    </form>
  )
}

export default SettingPage

SettingPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
