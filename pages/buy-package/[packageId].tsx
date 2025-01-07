import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Copyable } from "../../components/Copyable/Copyable";

import Layout from "../../components/Layout/Layout";

import { UploadImage } from "../../components/UploadImage/UploadImage";
import { useBuyPackageMutation } from "../../graphql/mutations/buyPackage.graphql.interface";
import { useMeQuery } from "../../graphql/queries/me.graphql.interface";
import { useGetPackagesQuery } from "../../graphql/queries/packages.graphql.interface";
import { toIRR } from "../../helpers";
import { ArrowUTurnLeftIcon } from "../../icons";
import { BuyPackageInput } from "../../src/graphql/__generated__/schema.graphql";
import type { NextPageWithLayout } from "../_app";

const BuyPackagePage: NextPageWithLayout = () => {
  const router = useRouter();
  const packageId = router.query?.packageId as string;
  const { toast } = useToast();
  const [buyPackageMutate, buyPackage] = useBuyPackageMutation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyPackageInput>();
  const packages = useGetPackagesQuery({ fetchPolicy: "cache-and-network", variables: { input: { category: null } } });
  const me = useMeQuery({ fetchPolicy: "cache-only" });
  const currentPackage = packages.data?.packages?.find((pack) => pack.id === packageId);
  const onSubmit = handleSubmit((data) => {
    buyPackageMutate({
      variables: {
        input: {
          name: data.name,
          receipt: data.receipt,
          packageId: packageId,
        },
      },
    })
      .then(() => {
        router.replace("/");
      })
      .catch((error) => {
        toast({ variant: "destructive", description: error.message });
      });
  });

  const firstError = Object.keys(errors)?.[0] as keyof BuyPackageInput;
  const isAdmin = me?.data?.me.role !== "USER";
  const buttonLabel = isAdmin ? "خرید" : "ارسال";

  if (currentPackage) {
    return (
      <form
        onSubmit={onSubmit}
        className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-6"
        style={{ minHeight: "calc(100vh - 6rem)" }}
      >
        <div className="space-y-2">
          <Label htmlFor="name">نام دلخواه برای بسته</Label>
          <Input {...register("name", { required: "لطفا یک نام دلخواه برای بسته وارد کنید." })} id="name" type="text" />
        </div>
        {!isAdmin && (
          <div className="w-full space-y-2">
            <Label>
              <span className="font-black">{toIRR(currentPackage.discountedPrice || currentPackage.price)}</span> کارت
              به کارت کنید
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
          <Button disabled={buyPackage?.loading} className="w-full" type="submit">
            {buyPackage?.loading ? "لطفا کمی صبر کنید..." : buttonLabel}
          </Button>
          <Button variant="ghost" type="button" className="flex w-full" onClick={router.back}>
            <ArrowUTurnLeftIcon className="ml-2 size-5" />
            <span>بازگشت</span>
          </Button>
        </div>
      </form>
    );
  }
};

export default BuyPackagePage;

BuyPackagePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
