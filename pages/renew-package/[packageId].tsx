import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copyable } from "../../components/Copyable/Copyable"

import Layout from "../../components/Layout/Layout"

import { UploadImage } from "../../components/UploadImage/UploadImage"
import { useRenewPackageMutation } from "../../graphql/mutations/renewPackage.graphql.interface"
import { useMeQuery } from "../../graphql/queries/me.graphql.interface"
import { useGetPackagesQuery } from "../../graphql/queries/packages.graphql.interface"
import { convertPersianCurrency } from "../../helpers"
import { RenewPackageInput } from "../../src/graphql/__generated__/schema.graphql"
import type { NextPageWithLayout } from "../_app"

const BuyPackagePage: NextPageWithLayout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const packageId = router.query?.packageId as string
  const userPackageId = searchParams.get("userPackageId")

  const [renewPackageMutate, renewPackage] = useRenewPackageMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RenewPackageInput>()
  const packages = useGetPackagesQuery({ fetchPolicy: "cache-only", variables: { input: {} } })
  const me = useMeQuery({ fetchPolicy: "cache-only" })
  const currentPackage = packages.data?.packages?.find((pack) => pack.id === packageId)

  const onSubmit = handleSubmit((data) => {
    renewPackageMutate({
      variables: {
        input: {
          userPackageId: userPackageId!,
          receipt: data.receipt,
          packageId: packageId,
        },
      },
    }).then(() => {
      router.replace("/")
    })
  })

  const firstError = Object.keys(errors)?.[0] as keyof RenewPackageInput
  const isAdmin = me?.data?.me.role !== "USER"
  const buttonLabel = isAdmin ? "تمدید" : "ارسال"

  if (currentPackage) {
    return (
      <form
        onSubmit={onSubmit}
        className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-6"
        style={{ minHeight: "calc(100vh - 6rem)" }}
      >
        {isAdmin && (
          <div className="w-full space-y-2 rounded-lg bg-slate-50 p-4 text-slate-600">
            <div>در حال تمدید بسته هستید، آیا مطمئنید؟</div>
            <div className="ltr text-right">{currentPackage.traffic} GB</div>
            <div>{convertPersianCurrency(currentPackage.price)}</div>
          </div>
        )}
        {!isAdmin && (
          <div className="w-full space-y-2">
            <Label>
              <span className="font-black">{convertPersianCurrency(currentPackage.price)}</span> کارت به کارت کنید
            </Label>
            <Copyable
              isCenter
              content={me.data?.me?.parent?.bankCard?.[0]?.number?.match(/.{1,4}/g)?.join(" ") || ""}
            />
            <Controller
              name="receipt"
              control={control}
              rules={{ required: "لطفا فیش واریز را وارد کنید." }}
              render={({ field: { onChange } }) => (
                <UploadImage label="تصویر فیش واریز را وارد کنید" onChange={onChange} />
              )}
            />
          </div>
        )}
        <div className="space-y-2">
          <div className=" text-sm text-red-600">{errors?.[firstError]?.message}&nbsp;</div>
          <Button disabled={renewPackage?.loading} className="w-full" type="submit">
            {renewPackage?.loading ? "لطفا کمی صبر کنید..." : buttonLabel}
          </Button>
        </div>
      </form>
    )
  }
}

export default BuyPackagePage

BuyPackagePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
