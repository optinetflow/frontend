import { useRouter } from "next/router"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"
import { useEnterCostMutation } from "../graphql/mutations/enterCost.graphql.interface"
import { useUpdateUserMutation } from "../graphql/mutations/updateUser.graphql.interface"

import { useMeQuery } from "../graphql/queries/me.graphql.interface"
import { normalizePhone } from "../helpers"
import { EnterCostInput, UpdateUserInput } from "../src/graphql/__generated__/schema.graphql"

const EnterConst: React.FC = () => {
  const router = useRouter()
  const me = useMeQuery({ fetchPolicy: "cache-only" })
  const [enterCost, enterCostData] = useEnterCostMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EnterCostInput>()

  const onSubmit = handleSubmit((data) => {
    enterCost({
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

  const firstError = Object.keys(errors)?.[0] as keyof EnterCostInput
  return (
    <form onSubmit={onSubmit} className="flex  w-full flex-col justify-center space-y-4">
      <h1 className="mb-6 font-black">وارد کردن هزینه</h1>
      <div className="space-y-2">
        <Label htmlFor="amount">مقدار (تومان)</Label>
        <Input className="ltr" {...register("amount", { valueAsNumber: true })} id="amount" type="number" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">دسترسی</Label>
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <Select onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="IRAN_SERVER_COST">سرور ایران</SelectItem>
                  <SelectItem value="EXTERNAL_SERVER_COST">سرور خارج</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">توضیحات</Label>
        <Input {...register("description")} id="description" type="text" />
      </div>

      <div className=" text-sm text-red-600">
        {errors?.[firstError]?.message || (enterCostData.error && "خطای سرور")}&nbsp;
      </div>
      <Button disabled={enterCostData?.loading} className="w-full" type="submit">
        {enterCostData?.loading ? "لطفا کمی صبر کنید..." : "ثبت"}
      </Button>
    </form>
  )
}

const SettingPage: NextPageWithLayout = () => {
  const router = useRouter()
  const me = useMeQuery({ fetchPolicy: "cache-only" })
  const bankCard = me?.data?.me.bankCard?.[0]
  const [updateUser, updateUserData] = useUpdateUserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInput>()

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
  const isSuperAdmin = me?.data?.me.maxRechargeDiscountPercent === 100
  return (
    <div
      className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-12"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <form onSubmit={onSubmit} className="flex w-full flex-col justify-center space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardBandName">نام مالک کارت بانکی</Label>
          <Input
            defaultValue={bankCard?.name}
            {...register("cardBandName", { required: "لطفا نام مالک کارت بانکی را وارد کنید." })}
            id="cardBandName"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardNumber">شماره کارت:</Label>
          <Input
            defaultValue={bankCard?.number || undefined}
            {...register("cardBandNumber", {
              setValueAs: normalizePhone,
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
      {isSuperAdmin && (
        <>
          <hr />
          <EnterConst />
        </>
      )}
    </div>
  )
}

export default SettingPage

SettingPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
