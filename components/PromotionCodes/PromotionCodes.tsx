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
import { removeWWW } from "helpers";
import { Copyable } from "../../components/Copyable/Copyable";

type GiftType = "FOUR_GB" | "EIGHT_GB";

interface PromotionCode {
  id: string;
  code: string;
  gift: GiftType;
}

interface PromotionCodeForm {
  code: string;
  gift: GiftType;
}

const PromotionCodes: React.FC = () => {
  const [promotionCodes, setPromotionCodes] = useState<PromotionCode[]>([
    // Example initial data
    { id: "1", code: "PROMO2024", gift: "FOUR_GB" },
    { id: "2", code: "SAVE50", gift: "EIGHT_GB" },
  ]);

  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedPromoForShare, setSelectedPromoForShare] = useState<PromotionCode | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [promotionCodeToDelete, setPromotionCodeToDelete] = useState<PromotionCode | null>(null);

  const { toast } = useToast();

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    control: controlAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm<PromotionCodeForm>();

  const onAddPromotionCode = (data: PromotionCodeForm) => {
    // Check for duplicate codes
    const isDuplicate = promotionCodes.some((code) => code.code === data.code);
    if (isDuplicate) {
      toast({
        title: "خطا",
        description: "این کد تبلیغاتی قبلاً اضافه شده است.",
        variant: "destructive",
      });
      return;
    }

    const newCode: PromotionCode = {
      id: (promotionCodes.length + 1).toString(),
      code: data.code,
      gift: data.gift,
    };
    setPromotionCodes([...promotionCodes, newCode]);
    toast({
      title: "موفقیت",
      description: "کد تبلیغاتی جدید اضافه شد.",
    });
    resetAdd();
    setIsAddSheetOpen(false); // Close the Add Bottom Sheet after successful addition
  };

  const onInitiateDeletePromotionCode = (code: PromotionCode) => {
    setPromotionCodeToDelete(code);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePromotionCode = () => {
    if (promotionCodeToDelete) {
      setPromotionCodes(promotionCodes.filter((code) => code.id !== promotionCodeToDelete.id));
      toast({
        title: "موفقیت",
        description: "کد تبلیغاتی حذف شد.",
      });
      setIsDeleteModalOpen(false);
      setPromotionCodeToDelete(null);
    }
  };

  const getPromotionUrl = (code: string) => {
    return `https://${removeWWW(window.location.host)}/${code}`;
  };

  const cancelDeletePromotionCode = () => {
    setIsDeleteModalOpen(false);
    setPromotionCodeToDelete(null);
  };

  const handleShare = (promo: PromotionCode) => {
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
          className="flex items-center justify-center rounded-full bg-slate-500 p-1 text-white transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <PlusIcon />
        </div>
      </div>

      <div className="space-y-4">
        {promotionCodes.length === 0 ? (
          <p className="text-gray-500">هیچ کد تبلیغاتی موجود نیست.</p>
        ) : (
          promotionCodes.map((promo) => (
            <div key={promo.id} className="mb-4 flex w-full items-center justify-between rounded-lg bg-slate-50 p-4">
              <div>
                <p className="font-semibold">کد: {promo.code}</p>
                <p>هدیه: {promo.gift === "FOUR_GB" ? "4 گیگابایت" : "8 گیگابایت"}</p>
              </div>
              <div className="flex">
                <Share2 onClick={() => handleShare(promo)} />
                <Trash2 onClick={() => onInitiateDeletePromotionCode(promo)} className="mr-1 text-red-800" />
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
      {/* Add Promotion Code Bottom Sheet */}
      <BottomSheet isOpen={isAddSheetOpen} onClose={() => setIsAddSheetOpen(false)} title="افزودن کد تبلیغاتی جدید">
        <form onSubmit={handleSubmitAdd(onAddPromotionCode)} className="flex flex-col space-y-4">
          {/* Code Input */}
          <div className="space-y-2">
            <Label htmlFor="addCode">کد تبلیغاتی</Label>
            <Input
              {...registerAdd("code", { required: "لطفا کد تبلیغاتی را وارد کنید." })}
              id="addCode"
              type="text"
              placeholder="کد تبلیغاتی"
              required
            />
            {errorsAdd.code && <span className="text-sm text-red-600">{errorsAdd.code.message}</span>}
          </div>

          {/* Gift Select */}
          <div className="space-y-2">
            <Label htmlFor="addGift">هدیه</Label>
            <Controller
              name="gift"
              control={controlAdd}
              rules={{ required: "لطفا نوع هدیه را انتخاب کنید." }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب هدیه" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="FOUR_GB">هدیه 4 گیگابایت</SelectItem>
                      <SelectItem value="EIGHT_GB">هدیه 8 گیگابایت</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errorsAdd.gift && <span className="text-sm text-red-600">{errorsAdd.gift.message}</span>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            افزودن
          </Button>
        </form>
      </BottomSheet>

      {/* Delete Confirmation Bottom Sheet */}
      <BottomSheet isOpen={isDeleteModalOpen} onClose={cancelDeletePromotionCode} title="تأیید حذف کد تبلیغاتی">
        <div className="flex flex-col items-center space-y-4">
          <p>آیا مطمئن هستید که می‌خواهید این کد تبلیغاتی را حذف کنید؟</p>
          <Button className="w-full bg-red-500" onClick={confirmDeletePromotionCode}>
            حذف
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default PromotionCodes;
