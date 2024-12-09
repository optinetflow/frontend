import { ChevronUp } from "lucide-react";
import React, { ReactNode } from "react";

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen = false, onClick }) => {
  return (
    <div>
      <h2>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 rounded-lg py-2 font-medium text-slate-800"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${title}`}
        >
          <span>{title}</span>
          <ChevronUp className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>
      </h2>
      {isOpen && (
        <div
          id={`accordion-content-${title}`}
          className="dark:bg-gray-900"
          role="region"
          aria-labelledby={`accordion-header-${title}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
