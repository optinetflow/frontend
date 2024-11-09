import { ShieldBan, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { removeWWW } from "../../helpers";
import { Stat } from "../Stat";
interface FreePackageBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  freePackage: any;
  promotionCode: string;
}

const FreePackageBottomSheet: React.FC<FreePackageBottomSheetProps> = ({
  isOpen,
  onClose,
  freePackage,
  promotionCode,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const { toast } = useToast();

  const handleSubmit = () => {
    const invitationLink = `https://${removeWWW(window.location.host)}/${promotionCode}`;

    if (navigator.share) {
      navigator
        .share({
          title: "دعوت به بسته رایگان روزانه",
          text: "یک بسته رایگان به دوستانتان هدیه دهید و از مزایای بیشتر بهره‌مند شوید!",
          url: invitationLink,
        })
        .then(() => {
          toast({
            description: "لینک دعوت کپی شد! آن را با دوستان خود به اشتراک بگذارید.",
            duration: 500,
          });
        })
        .catch((error) => console.log("Error sharing invitation link:", error));
    } else {
      navigator.clipboard.writeText(invitationLink).then(() => {
        toast({
          description: "لینک دعوت کپی شد! آن را با دوستان خود به اشتراک بگذارید.",
          duration: 500,
        });
      });
    }

    setTimeout(() => onClose(), 50);
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 20);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-gray-900/50">
      {/* Backdrop */}
      <div className="absolute inset-0 z-30" onClick={onClose}></div>

      <div
        className={`relative z-40 w-full max-w-lg rounded-t-lg bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "63%" }} // Set height to 60% of the screen
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">بسته رایگان روزانه</h2>
          <button onClick={onClose} className="text-gray-500">
            <X />
          </button>
        </div>

        <div className="grow overflow-y-auto px-4 pb-20">
          <div className="my-4 text-center text-slate-600">
            <p className="font-bold">بسته‌های رایگان همیشه هست 💸 </p>
            <p className="text-slate-600">به دوستات هم بگو تا اونا هم استفاده کنن</p>
          </div>

          {freePackage ? (
            <Stat pack={freePackage} isFree={true} />
          ) : (
            <div className="mt-10 flex flex-col items-center text-center text-slate-500">
              <ShieldBan className="size-20 text-red-500" />
              <p>بسته رایگان امروزت رو مصرف کردی.</p>
              <p>بسته بعدی فردا فعال میشه.</p>
            </div>
          )}

          <div className="absolute bottom-0 left-0 w-full border-gray-200 bg-white p-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-md bg-slate-800 px-4 py-3 text-white hover:bg-slate-700"
            >
              اشتراک‌گذاری لینک دعوت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreePackageBottomSheet;
