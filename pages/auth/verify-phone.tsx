import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useVerifyPhoneMutation } from "graphql/mutations/verifyPhone.graphql.interface"
import Layout from "../../components/Layout/Layout"
import Loading from "../../components/Loading/Loading"
import { useLogoutMutation } from "../../graphql/mutations/logout.graphql.interface"
import { useSendOtpAgainMutation } from "../../graphql/mutations/sendOtpAgain.graphql.interface"
import { useMeQuery } from "../../graphql/queries/me.graphql.interface"
import { formatSecondsToMMSS, removeWWW } from "../../helpers"
import type { NextPageWithLayout } from "../_app"


interface FormValues {
  otp: string
}

const VerifyPhonePage: NextPageWithLayout = () => {
  const router = useRouter()
  const domainName = removeWWW(window.location.host)
  const [sendOtpAgain] = useSendOtpAgainMutation({errorPolicy: "all"});
  const [timer, setTimer] = useState<number>(120); // 2 minutes in seconds
  const [otpSent, setOtpSent] = useState<boolean>(false); // Track if OTP has been sent
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Track the interval ID
  const [loading, setLoading] = useState(true);
  const phone = router.query.phone as string


  useEffect(() => {
    if (!phone) {
      setLoading(true)
      sendOtpAgain({
        variables: {
          input: {
            domainName,
          },
        },
      }).then((res) => {
        if(res.data?.sendOtpAgain === true) {
          setOtpSent(true)
          setLoading(false)
        }
      })
      .catch((error) => console.error('Failed to send OTP:', error));
    }
    const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTimer - 1;
        });
    }, 1000);
  
    setIntervalId(intervalId); // Save the interval ID

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [phone, domainName, sendOtpAgain]);
  
  const [verifyPhone, verifyPhoneData] = useVerifyPhoneMutation({ errorPolicy: "all" })

  const { data: meData } = useMeQuery({
    skip: !otpSent, // Skip fetching if OTP hasn't been sent yet
    fetchPolicy: 'cache-and-network'
  });

  // Function to handle OTP resend
  const handleResendOtp = () => {
    sendOtpAgain({
        variables: {
          input: {
            domainName,
            phone: phone || undefined
          },
        },
      }).then(() => {
          setTimer(120); // Reset the timer to 2 minutes
          if (intervalId) clearInterval(intervalId); // Clear the previous interval
          const id = setInterval(() => {
            setTimer((prevTimer) => {
              if (prevTimer <= 1) {
                clearInterval(id);
                return 0;
              }
              return prevTimer - 1;
            });
          }, 1000);
          setIntervalId(id); // Start a new interval
      })
      .catch((error) => console.error('Failed to resend OTP:', error));
  }
   

  const handleBackClick = () => {
    if(phone) {
        router.back();
    }
  };

  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    logout().then(() => {
      localStorage.clear()
      router.replace("/login")
    })
  }

  useEffect(() => {
    if (meData?.me.isVerified === true) {
      router.replace('/');
    }
  }, [meData, router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => {
    verifyPhone({
      variables: {
        input: {
          otp: data.otp,
          phone: phone || undefined, 
          domainName
        },
      },
    }).then((res) => {
        if(res.data?.verifyPhone.accessToken) {
            router.replace('/');
        }
    })
  })

  const firstError = Object.keys(errors)?.[0] as keyof FormValues

  return (
    <>
      {loading ? ( // If loading is true, show a loading spinner or message
        <Loading></Loading>
      ) : (
        <form onSubmit={onSubmit} className="mx-auto flex h-screen max-w-xs">
          <div className="m-auto w-full">
            <Card className="mb-4 w-full">
              <CardContent className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">
                    کد تایید را وارد کنید ({phone || meData?.me.phone})
                  </Label>
                  <Input
                    {...register("otp")}
                    className="ltr"
                    id="otp"
                    placeholder="مثلا 1234"
                    required
                    type="number"
                  />
                </div>
                <div className="text-sm text-red-600">
                  {errors?.[firstError]?.message || verifyPhoneData.error?.message}&nbsp;
                </div>
                <div className="text-sm text-gray-600">
                  {timer > 0
                    ? `مدت زمان باقی‌مانده: ${formatSecondsToMMSS(timer)}`
                    : "کد را دریافت نکردید؟"}
                </div>
                {timer === 0 && (
                  <div className="text-center mt-4">
                    <Button onClick={handleResendOtp} className="w-full">
                      ارسال مجدد کد تایید
                    </Button>
                  </div>
                )}
                {timer > 0 && (
                  <Button
                    disabled={verifyPhoneData?.loading}
                    className="w-full"
                    type="submit"
                  >
                    {verifyPhoneData?.loading ? "لطفا کمی صبر کنید..." : "تایید"}
                  </Button>
                )}
                {phone && (
                  <div className="mt-4 text-center text-sm">
                    <p>
                      شماره اشتباه است؟{' '}
                      <button
                        onClick={handleBackClick}
                        className="text-blue-600 underline bg-transparent border-none cursor-pointer"
                      >
                        تغییر دهید
                      </button>
                    </p>
                  </div>
                )}
                {!phone && (
                  <div className="mt-4 text-center text-sm">
                    <p>
                      با شماره دیگری میخواهید وارد شوید؟{' '}
                      <button
                        onClick={handleLogout}
                        className="text-blue-600 underline bg-transparent border-none cursor-pointer"
                      >
                        خروج از حساب کاربری
                      </button>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </form>
      )}
    </>
  );
  
}

export default VerifyPhonePage

VerifyPhonePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
