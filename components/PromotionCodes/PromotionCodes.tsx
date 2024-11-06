import { PlusIcon, Share2, Trash2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BottomSheet from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useGetGiftPackagesQuery } from "graphql/queries/getGiftPackages.graphql.interface";
import { GetPromotionCodesQuery, useGetPromotionCodesQuery } from "graphql/queries/getPromotionCodes.graphql.interface";
import { removeWWW } from "helpers";
import PromotionCodeCardSkeleton from "./PromotionCodesSkeleton";
import { Copyable } from "../../components/Copyable/Copyable";
import { useCreatePromotionCodeMutation } from "../../graphql/mutations/createPromotionCode.graphql.interface";
import { useDeletePromotionCodeMutation } from "../../graphql/mutations/deletePromotionCode.graphql.interface";

interface PromotionCodeForm {
  code: string;
  giftPackageId: string;
}

const PromotionCodes: React.FC = () => {
  const {
    data,
    refetch: refetchPromotionCodes,
    loading,
  } = useGetPromotionCodesQuery({
    fetchPolicy: "cache-and-network",
  });
  const { data: giftPackages } = useGetGiftPackagesQuery({
    fetchPolicy: "cache-first",
  });
  const [createPromotionCode, createPromotionCodeData] = useCreatePromotionCodeMutation();
  const [deletePromotionCode, deletePromotionCodeData] = useDeletePromotionCodeMutation();

  const promotionCodes = data?.getPromotionCodes || [];

  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedPromoForShare, setSelectedPromoForShare] = useState<
    GetPromotionCodesQuery["getPromotionCodes"][number] | null
  >(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [promotionCodeToDelete, setPromotionCodeToDelete] = useState<
    GetPromotionCodesQuery["getPromotionCodes"][number] | null
  >(null);

  const { toast } = useToast();

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    control: controlAdd,
    reset: resetAdd,
    formState: { errors },
  } = useForm<PromotionCodeForm>();
  const firstError = Object.keys(errors)?.[0] as keyof PromotionCodeForm;

  const onAddPromotionCode = async (formData: PromotionCodeForm) => {
    createPromotionCode({
      variables: { input: { code: formData.code, giftPackageId: formData.giftPackageId } },
    })
      .then(() => {
        toast({
          title: "موفقیت",
          description: "کد تبلیغاتی جدید اضافه شد.",
        });
        resetAdd();
        setIsAddSheetOpen(false);
        refetchPromotionCodes();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onInitiateDeletePromotionCode = (code: GetPromotionCodesQuery["getPromotionCodes"][number]) => {
    setPromotionCodeToDelete(code);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePromotionCode = async () => {
    if (promotionCodeToDelete) {
      deletePromotionCode({ variables: { input: { promotionId: promotionCodeToDelete.id } } })
        .then(() => {
          toast({
            title: "موفقیت",
            description: "کد تبلیغاتی حذف شد.",
          });
          setIsDeleteModalOpen(false);
          setPromotionCodeToDelete(null);
          refetchPromotionCodes();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const getPromotionUrl = (code: string) => {
    return `https://${removeWWW(window.location.host)}/${code}`;
  };

  const cancelDeletePromotionCode = () => {
    setIsDeleteModalOpen(false);
    setPromotionCodeToDelete(null);
  };

  const handleShare = (promo: GetPromotionCodesQuery["getPromotionCodes"][number]) => {
    setSelectedPromoForShare(promo);
    setIsShareModalOpen(true);
  };

  const shareViaWebShare = async (url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Promotion Code",
          text: `Use this promotion code: ${selectedPromoForShare?.code}`,
          url: url,
        });
        toast({
          title: "موفقیت",
          description: "آدرس با موفقیت به اشتراک گذاشته شد.",
        });
        setIsShareModalOpen(false);
        setSelectedPromoForShare(null);
      } catch (error) {
        toast({
          title: "خطا",
          description: "اشتراک گذاری لغو شد.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "خطا",
        description: "امکان اشتراک گذاری از طریق این مرورگر وجود ندارد.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-6 rounded-md border border-slate-200 bg-slate-50 p-4">
        <p className="font-semibold text-slate-700">کد تبلیغاتی چیه؟ 🤔</p>
        <p className="mt-1 text-sm text-slate-600">
          کد تبلیغاتی درست کن و لینک رو پخش کن! هر کسی با این لینک ثبت‌نام کنه، مشتری تو میشه و یه هدیه می‌گیره. این
          لینک برای تبلیغات هم کلی به‌کارت میاد!
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">مدیریت کدهای تبلیغاتی</h2>
        <div
          onClick={() => setIsAddSheetOpen(true)}
          className="flex cursor-pointer items-center justify-center rounded-full bg-slate-500 p-1 text-white transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <PlusIcon />
        </div>
      </div>

      <div className="space-y-4">
        {loading && !data ? (
          // Display multiple skeleton cards while loading
          <>
            <PromotionCodeCardSkeleton />
            <PromotionCodeCardSkeleton />
            <PromotionCodeCardSkeleton />
          </>
        ) : promotionCodes.length === 0 ? (
          <p className="text-gray-500">هیچ کد تبلیغاتی موجود نیست.</p>
        ) : (
          promotionCodes.map((promo) => (
            <div key={promo.id} className="mb-4 flex w-full items-center justify-between rounded-lg bg-slate-50 p-4">
              <div>
                <p className="font-semibold">کد: {promo.code}</p>
                <p>هدیه: {promo.giftPackage?.traffic ? `${promo.giftPackage.traffic} گیگابایت` : "ندارد"}</p>
              </div>
              <div className="flex">
                <Share2 onClick={() => handleShare(promo)} className="text-gray-600 hover:text-blue-500" />
                <Trash2
                  onClick={() => onInitiateDeletePromotionCode(promo)}
                  className="mr-3 text-red-600 hover:text-red-800"
                />
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setSelectedPromoForShare(null);
        }}
        title=""
      >
        {selectedPromoForShare && (
          <div className="flex flex-col items-center space-y-4">
            <QRCodeSVG
              id={`qr-code-${selectedPromoForShare.code}`}
              value={getPromotionUrl(selectedPromoForShare.code)}
              size={200}
            />

            <div className="w-full">
              <Label htmlFor="promo-url">آدرس کد تبلیغاتی</Label>
              <div className="flex">
                <Copyable
                  className="w-full text-xs font-thin text-slate-500"
                  content={getPromotionUrl(selectedPromoForShare.code)}
                />
              </div>
            </div>

            <Button onClick={() => shareViaWebShare(getPromotionUrl(selectedPromoForShare.code))} className="w-full">
              اشتراک گذاری
            </Button>
          </div>
        )}
      </Modal>

      <BottomSheet isOpen={isAddSheetOpen} onClose={() => setIsAddSheetOpen(false)} title="افزودن کد تبلیغاتی جدید">
        <form
          onSubmit={handleSubmitAdd(onAddPromotionCode)}
          className="flex flex-col space-y-4"
          style={{ height: "60vh" }}
        >
          <div className="space-y-2">
            <Label htmlFor="code">کد تبلیغاتی</Label>
            <Input
              {...registerAdd("code", {
                required: "لطفا کد تبلیغاتی را وارد کنید.",
                pattern: {
                  value: /^[\dA-Za-z]{4,10}$/,
                  message: "کد باید بین 4 تا 10 حرف باشد و فقط شامل حروف انگلیسی و اعداد باشد.",
                },
              })}
              id="code"
              type="text"
              placeholder="کد تبلیغاتی"
            />
          </div>

          {/* Gift Select */}
          <div className="space-y-2">
            <Label htmlFor="addGift">هدیه</Label>
            <Controller
              name="giftPackageId"
              control={controlAdd}
              rules={{ required: "لطفا نوع هدیه را انتخاب کنید." }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب هدیه" />
                  </SelectTrigger>
                  <SelectContent>
                    {giftPackages?.getGiftPackages.map((gift) => (
                      <SelectGroup key={gift.id}>
                        <SelectItem value={gift.id}>هدیه {gift.traffic} گیگابایت</SelectItem>
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <div className="text-sm text-red-600">
              {errors?.[firstError]?.message || createPromotionCodeData.error?.message}&nbsp;
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full border-gray-200 bg-white p-4">
            <button
              type="submit"
              disabled={createPromotionCodeData?.loading}
              className="w-full rounded-md bg-slate-800 px-4 py-3 text-white hover:bg-slate-700"
            >
              {createPromotionCodeData?.loading ? "لطفا کمی صبر کنید..." : "افزودن"}
            </button>
          </div>
        </form>
      </BottomSheet>

      {/* Delete Confirmation Bottom Sheet */}
      <BottomSheet isOpen={isDeleteModalOpen} onClose={cancelDeletePromotionCode} title="تأیید حذف کد تبلیغاتی">
        <div className="flex flex-col items-center space-y-4">
          <p>آیا مطمئن هستید که می‌خواهید این کد تبلیغاتی را حذف کنید؟</p>
          <Button
            disabled={deletePromotionCodeData?.loading}
            className="w-full bg-red-500"
            onClick={confirmDeletePromotionCode}
          >
            {deletePromotionCodeData?.loading ? "لطفا کمی صبر کنید..." : "حذف"}
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default PromotionCodes;
