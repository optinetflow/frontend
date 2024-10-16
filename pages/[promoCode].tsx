import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"
import { useSignupMutation } from "../graphql/mutations/signup.graphql.interface"
import { useCheckAuthQuery } from "../graphql/queries/checkAuth.graphql.interface"
import { normalizePhone, removeWWW } from "../helpers"
import { SignupInput } from "../src/graphql/__generated__/schema.graphql"

const PromoCodePage: NextPageWithLayout = () => {
  const router = useRouter()
  const promoCode = router.query?.promoCode as string
  const { data } = useCheckAuthQuery({
    fetchPolicy: "no-cache",
  })
  if (data?.checkAuth.loggedIn) {
    router.replace("/")
  }

  const [signup, signupData] = useSignupMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>()

  const onSubmit = handleSubmit((data) => {
    signup({
      variables: {
        input: {
          ...data,
          promoCode,
          domainName: removeWWW(window.location.host),
        },
      },
    })
      .then(() => {
        router.push(`/auth/verify-phone?phone=${data.phone}`)
      })
      .catch((e) => {
        console.error(e)
      })
  })

  const firstError = Object.keys(errors)?.[0] as keyof SignupInput
  if (!data || data?.checkAuth.loggedIn) {
    return null
  }
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-4"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="space-y-2">
        <Label htmlFor="fullname">نام و نام خانوادگی (فارسی)</Label>
        <Input {...register("fullname")} id="fullname" required type="text" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">شماره موبایل</Label>
        <Input
          {...register("phone", {
            setValueAs: normalizePhone,
            pattern: { value: /^9\d{9}$/, message: "شماره موبایل را بدون صفر وارد کنید." },
          })}
          className="ltr"
          id="phone"
          placeholder="0912XXXXXXX"
          required
          type="tel"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">رمز عبور جدید</Label>
        <Input
          {...register("password", { minLength: { value: 4, message: "رمز باید حداقل ۴ حرف باشد." } })}
          className="ltr"
          id="password"
          required
          type="text"
        />
      </div>

      <div className=" text-sm text-red-600">{errors?.[firstError]?.message || signupData.error?.message}&nbsp;</div>
      <Button disabled={signupData?.loading} className="w-full" type="submit">
        {signupData?.loading ? "لطفا کمی صبر کنید..." : "ثبت نام"}
      </Button>
      <div className="mt-4 text-center text-sm">
        <p>
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="text-blue-600 underline">
            ورود
          </Link>
        </p>
      </div>
    </form>
  )
}

export default PromoCodePage

PromoCodePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
