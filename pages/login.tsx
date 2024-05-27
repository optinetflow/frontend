import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { NextPageWithLayout } from "./_app"
import Layout from "../components/Layout/Layout"

import { useLoginMutation } from "../graphql/mutations/login.graphql.interface"
import { normalizePhone } from "../helpers"

interface FormValues {
  phone: string
  password: string
}

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [login, loginData] = useLoginMutation({ errorPolicy: "all" })
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => {
    login({
      variables: {
        input: data,
      },
    })
  })

  if (loginData?.data?.login) {
    if (loginData?.data?.login?.isPromoCodeValid) {
      const formData = getValues();
      router.push(`/signup?phone=${formData.phone}&promoCode=${formData.password}`);
      return;
    }
 
    const redirected = searchParams.get("redirected")
    router.push(redirected ? decodeURIComponent(redirected) : "/")
  }

  const firstError = Object.keys(errors)?.[0] as keyof FormValues

  return (
    <form onSubmit={onSubmit} className="mx-auto flex h-screen max-w-xs">
      <div className="m-auto w-full">
        <Card className="mb-4 w-full">
          <CardContent className="mt-4 space-y-4">
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
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور (یا کد ثبت‌نام)</Label>
              <Input {...register("password")} className="ltr" id="password" required type="password" />
            </div>
            <div className=" text-sm text-red-600">
              {errors?.[firstError]?.message || (loginData?.error && "شماره موبایل یا رمز عبور اشتباهه!")}&nbsp;
            </div>
            <Button disabled={loginData?.loading} className="w-full" type="submit">
              {loginData?.loading ? "لطفا کمی صبر کنید..." : "ورود"}
            </Button>
          </CardContent>
        </Card>
        {/* <Link className="w-full" href="/stat">
          <Button variant="outline" className="flex w-full">
            مشاهده لینک
          </Button>
        </Link> */}
      </div>
    </form>
  )
}

export default LoginPage

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
