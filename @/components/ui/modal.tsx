import { X } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [isVisible, setIsVisible] = useState(false); // Controls animation state
  const [shouldRender, setShouldRender] = useState(isOpen); // Controls render state

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true); // Start rendering
      setTimeout(() => setIsVisible(true), 20); // Delay for the enter animation
    } else {
      setIsVisible(false); // Trigger exit animation
      setTimeout(() => setShouldRender(false), 300); // Delay unmounting for exit animation
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 z-40" onClick={onClose} aria-hidden="true"></div>

      {/* Modal Content */}
      <div
        className={`relative z-50 mx-4 w-full max-w-lg rounded-lg bg-white shadow-lg transition-transform duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">{title || ""}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <X />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
