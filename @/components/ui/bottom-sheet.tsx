import { X } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string; // Optional: For adding a title to the bottom sheet
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children, title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

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
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">{title || ""}</h2>
          <button onClick={onClose} className="text-gray-500">
            <X />
          </button>
        </div>

        {/* Bottom Sheet Body */}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
