import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"
import { useSignupMutation } from "../graphql/mutations/signup.graphql.interface"
import { normalizePhone, removeWWW } from "../helpers"
import { SignupInput } from "../src/graphql/__generated__/schema.graphql"

const SignupPage: NextPageWithLayout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone")
  const promoCode = searchParams.get("promoCode")
  
  const [signup, signupData] = useSignupMutation({errorPolicy: 'all'})
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>()

  const onSubmit = handleSubmit(async (data) => {
    await signup({
      variables: {
        input: {
          ...data,
          ...(phone && { phone }),
          promoCode,
          domainName: removeWWW(window.location.host)
        },
      },
    }).then(() => {
      router.push('/customers')
    }).catch(err => {
      console.error(err)
    })
  })

  const firstError = Object.keys(errors)?.[0] as keyof SignupInput
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
      
      {!promoCode && (
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
      )}

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

      <div className=" text-sm text-red-600">
        {errors?.[firstError]?.message || (signupData.error?.message)}&nbsp;
      </div>
      <Button disabled={signupData?.loading} className="w-full" type="submit">
        {signupData?.loading ? "لطفا کمی صبر کنید..." : "ثبت نام"}
      </Button>
    </form>
  )
}

export default SignupPage

SignupPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
