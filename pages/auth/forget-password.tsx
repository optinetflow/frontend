import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Layout from "../../components/Layout/Layout";
import { useResetPasswordMutation } from "../../graphql/mutations/resetPassword.graphql.interface";
import { useSendForgetPasswordOtpMutation } from "../../graphql/mutations/sendForgetPasswordOtp.graphql.interface";
import { normalizePhone, removeWWW } from "../../helpers";
import type { NextPageWithLayout } from "../_app";

interface FormValues {
  phone: string;
  password: string;
  otp: string;
}

const ForgetPasswordPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [otpSent, setOtpSent] = useState<boolean>(false); // Track if OTP has been sent
  const [sendForgetPasswordOtp, sendForgetPasswordOtpData] = useSendForgetPasswordOtpMutation({ errorPolicy: "all" });
  const [resetPassword, resetPasswordData] = useResetPasswordMutation({ errorPolicy: "all" });
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  const handleSendForgetPasswordOtp = async () => {
    const data = getValues();
    sendForgetPasswordOtp({
      variables: {
        input: {
          phone: data.phone,
          domainName: removeWWW(window.location.host),
        },
      },
    }).then((res) => {
      if (res.data?.sendForgetPasswordOtp === true) {
        setOtpSent(true);
      }
    });
  };

  const handleResetPassword = async () => {
    const data = getValues();
    resetPassword({
      variables: {
        input: {
          phone: data.phone,
          otp: data.otp,
          password: data.password,
          domainName: removeWWW(window.location.host),
        },
      },
    }).then((res) => {
      if (res.data?.resetPassword === true) {
        toast({
          description: "رمز عبور با موفقیت تغییر یافت",
          duration: 1000,
        });

        router.push("/login");
      }
    });
  };

  const firstError = Object.keys(errors)?.[0] as keyof FormValues;

  return (
    <form className="mx-auto flex h-screen max-w-xs">
      <div className="m-auto w-full">
        <Card className="mb-4 w-full">
          <CardContent className="mt-4 space-y-4">
            {!otpSent && (
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
            )}
            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور جدید را وارد کنید</Label>
                <Input {...register("password")} className="ltr" id="password" required type="password" />
              </div>
            )}
            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp">کد تایید ارسال شده به شماره موبایل</Label>
                <Input {...register("otp")} className="ltr" id="otp" placeholder="مثلا 1234" required type="number" />
              </div>
            )}
            <div className=" text-sm text-red-600">
              {errors?.[firstError]?.message ||
                sendForgetPasswordOtpData?.error?.message ||
                resetPasswordData.error?.message}
              &nbsp;
            </div>
            {otpSent && (
              <Button disabled={resetPasswordData?.loading} className="w-full" onClick={handleResetPassword}>
                {resetPasswordData?.loading ? "لطفا کمی صبر کنید..." : "تغییر رمز ورود"}
              </Button>
            )}
            {!otpSent && (
              <Button
                disabled={sendForgetPasswordOtpData?.loading}
                className="w-full"
                onClick={handleSendForgetPasswordOtp}
              >
                {sendForgetPasswordOtpData?.loading ? "لطفا کمی صبر کنید..." : "ارسال کد تایید"}
              </Button>
            )}
          </CardContent>
        </Card>
        {/* <Link className="w-full" href="/stat">
          <Button variant="outline" className="flex w-full">
            مشاهده لینک
          </Button>
        </Link> */}
      </div>
    </form>
  );
};

export default ForgetPasswordPage;

ForgetPasswordPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
