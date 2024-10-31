import { useRouter } from "next/router"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copyable } from "../../components/Copyable/Copyable"
import Layout from "../../components/Layout/Layout"
import { UploadImage } from "../../components/UploadImage/UploadImage"
import { useBuyRechargePackageMutation } from "../../graphql/mutations/buyRechargePackage.graphql.interface"
import { useMeQuery } from "../../graphql/queries/me.graphql.interface"
import { useRechargePackagesQuery } from "../../graphql/queries/rechargePackages.graphql.interface"
import { toIRR } from "../../helpers"
import type { NextPageWithLayout } from "../_app"

interface FormValues {
  receipt: string
}

const RechargeAccountPage: NextPageWithLayout = () => {
  const router = useRouter()
  const me = useMeQuery({ fetchPolicy: "cache-only" })
  const rechargePackageId = router.query?.rechargePackageId as string
  const [buyRechargePackageMutate, buyRechargePackage] = useBuyRechargePackageMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const rechargePackages = useRechargePackagesQuery({ fetchPolicy: "cache-only" })
  const currentRechargePackage = rechargePackages.data?.rechargePackages.find((pack) => pack.id === rechargePackageId)

  const onSubmit = handleSubmit((data) => {
    buyRechargePackageMutate({
      variables: {
        input: {
          receipt: data.receipt,
          rechargePackageId: rechargePackageId,
        },
      },
    }).then(() => {
      router.replace("/")
    })
  })

  const firstError = Object.keys(errors)?.[0] as keyof FormValues

  if (currentRechargePackage) {
    return (
      <form
        onSubmit={onSubmit}
        className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-6"
        style={{ minHeight: "calc(100vh - 6rem)" }}
      >
        <div className="w-full space-y-2">
          <Label>
            <span className="font-black">{toIRR(currentRechargePackage.amount)}</span> کارت به کارت
            کنید
          </Label>
          <Copyable isCenter content={me.data?.me?.parent?.bankCard?.[0]?.number?.match(/.{1,4}/g)?.join(" ") || ""} />
          <Controller
            name="receipt"
            control={control}
            rules={{ required: "لطفا فیش واریز را وارد کنید." }}
            render={({ field: { onChange } }) => (
              <UploadImage label="تصویر فیش واریز را وارد کنید" onChange={onChange} />
            )}
          />
        </div>
        <div className="space-y-2">
          <div className=" text-sm text-red-600">{errors?.[firstError]?.message}&nbsp;</div>
          <Button disabled={buyRechargePackage?.loading} className="w-full" type="submit">
            {buyRechargePackage?.loading ? "لطفا کمی صبر کنید..." : "ارسال"}
          </Button>
        </div>
      </form>
    )
  }
}

export default RechargeAccountPage

RechargeAccountPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
