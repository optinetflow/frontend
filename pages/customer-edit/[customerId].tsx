import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Layout from "../../components/Layout/Layout";
import { useUpdateChildMutation } from "../../graphql/mutations/updateChild.graphql.interface";
import { useGetChildrenBySegmentQuery } from "../../graphql/queries/getChildrenBySegment.graphql.interface";
import { useMeQuery } from "../../graphql/queries/me.graphql.interface";
import { normalizeNumber, normalizePhone, roundTo } from "../../helpers";
import { GetChildrenBySegmentOutput, UpdateChildInput } from "../../src/graphql/__generated__/schema.graphql";
import type { NextPageWithLayout } from "../_app";

const CustomerEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const id = router.query?.customerId as string;
  const [updateChild, updateChildData] = useUpdateChildMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateChildInput>();
  const customersBySegments = useGetChildrenBySegmentQuery({ fetchPolicy: "cache-only" });
  const me = useMeQuery({ fetchPolicy: "cache-only" });
  const customers = Object.values(customersBySegments.data?.getChildrenBySegment as GetChildrenBySegmentOutput)
    .filter((value) => Array.isArray(value))
    .flat();
  const customer = customers.find((child) => child.id === id);
  const profitPercent = me?.data?.me?.profitPercent || 0;
  const isSuperAdmin = me?.data?.me.maxRechargeDiscountPercent === 100;

  const onSubmit = handleSubmit((data) => {
    updateChild({
      variables: {
        input: {
          ...Object.keys(data).reduce(
            (all, key) => ({ ...all, [key]: data[key as keyof UpdateChildInput] || undefined }),
            {}
          ),
          childId: id,
          initialDiscountPercent: Number(data.initialDiscountPercent),
        },
      },
    })
      .then(() => {
        router.back();
      })
      .catch((e) => {
        console.error(e);
      });
  });

  const firstError = Object.keys(errors)?.[0] as keyof UpdateChildInput;
  const maxChildDiscount = (profitPercent / (100 + profitPercent)) * 100;

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto my-12 flex max-w-xs flex-col justify-center space-y-4"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="space-y-2">
        <Label htmlFor="fullname">نام و نام خانوادگی (فارسی)</Label>
        <Input defaultValue={customer?.fullname} {...register("fullname")} id="fullname" required type="text" />
      </div>

      {isSuperAdmin && (
        <div className="space-y-2">
          <Label htmlFor="role">دسترسی</Label>
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            defaultValue={customer?.role}
            render={({ field: { onChange } }) => (
              <Select defaultValue={customer?.role} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="USER">کاربر عادی</SelectItem>
                    <SelectItem value="ADMIN">ادمین</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="phone">شماره موبایل</Label>
        <Input
          defaultValue={customer?.phone}
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
        <Label htmlFor="password">تغییر رمز عبور</Label>
        <Input
          {...register("password", { minLength: { value: 4, message: "رمز باید حداقل ۴ حرف باشد." } })}
          className="ltr"
          id="password"
          type="text"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="initialDiscountPercent">درصد تخفیف (تا {roundTo(maxChildDiscount, 2)} درصد):</Label>
        <Input
          defaultValue={customer?.initialDiscountPercent || undefined}
          {...register("initialDiscountPercent", {
            setValueAs: (val) => normalizeNumber(val),
            max: {
              value: maxChildDiscount,
              message: `با این درصد تخفیف شما ضرر می‌کنید. بالاترین درصد تخفیف که ضرر نکنید ${roundTo(
                maxChildDiscount,
                2
              )}٪ است.`,
            },
          })}
          className="ltr"
          id="initialDiscountPercent"
          placeholder="مثلا: 5"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">توضیحات (اختیاری)</Label>
        <Textarea
          className="resize-none"
          rows={3}
          defaultValue={customer?.description || undefined}
          {...register("description")}
          id="description"
        />
      </div>

      <div className=" text-sm text-red-600">
        {errors?.[firstError]?.message || (updateChildData.error && updateChildData.error?.message)}&nbsp;
      </div>
      <Button disabled={updateChildData?.loading} className="w-full" type="submit">
        {updateChildData?.loading ? "لطفا کمی صبر کنید..." : "اعمال تغییرات"}
      </Button>
    </form>
  );
};

export default CustomerEditPage;

CustomerEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
