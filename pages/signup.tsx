import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"
import { useSignupMutation } from "../graphql/mutations/signup.graphql.interface"
import { faNumToEn } from "../helpers"
import { SignupInput } from "../src/graphql/__generated__/schema.graphql"

const SignupPage: NextPageWithLayout = () => {
  const router = useRouter()

  const [signup, signupData] = useSignupMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>()

  const onSubmit = handleSubmit((data) => {
    signup({
      variables: {
        input: data,
      },
    })
      .then(() => {
        router.replace("/customers")
      })
      .catch((e) => {
        console.error(e)
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
        <Label htmlFor="firstname">نام (فارسی)</Label>
        <Input {...register("firstname")} id="firstname" required type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastname">نام خانوادگی (فارسی)</Label>
        <Input {...register("lastname")} id="lastname" required type="text" />
      </div>
      {/* <div className="space-y-2">
        <Label htmlFor="referId">شماره موبایل معرف (اختیاری)</Label>
        <Input {...register("referId")}  id="referId" type="text" />
      </div> */}
      <div className="space-y-2">
        <Label htmlFor="phone">شماره موبایل</Label>
        <Input
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
        <Label htmlFor="password">رمز عبور</Label>
        <Input
          {...register("password", { minLength: { value: 4, message: "رمز باید حداقل ۴ حرف باشد." } })}
          className="ltr"
          id="password"
          required
          type="text"
        />
      </div>

      <div className=" text-sm text-red-600">
        {errors?.[firstError]?.message || (signupData.error && "این شماره موبایل قبلا ثبت نام کرده است.")}&nbsp;
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
