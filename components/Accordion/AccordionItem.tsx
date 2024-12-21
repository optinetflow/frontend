import { ChevronUp } from "lucide-react";
import React, { ReactNode } from "react";

export interface AccordionItemProps {
  key: string; // Added a unique identifier prop
  title: string;
  subTitle?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ key, title, subTitle, children, isOpen = false, onClick }) => {
  const buttonId = `accordion-button-${key}`;
  const contentId = `accordion-content-${key}`;

  return (
    <div className="w-full border-gray-200 dark:border-gray-700">
      {/* Accordion Header */}
      <h3 className="text-base font-semibold">
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-start justify-between py-4 text-right focus:outline-none"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <div className="flex flex-col">
            <span className="text-lg font-medium text-slate-800 dark:text-slate-200">{title}</span>
            {subTitle && <span className="mt-1 text-xs font-thin text-slate-500">{subTitle}</span>}
          </div>
          <ChevronUp
            className={`size-5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </h3>

      {/* Accordion Content */}
      {isOpen && (
        <div id={contentId} aria-labelledby={buttonId}>
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
