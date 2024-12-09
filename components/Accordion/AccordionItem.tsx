// src/components/Accordion/AccordionItem.tsx
import React, { ReactNode } from "react";

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean; // Made optional
  onClick?: () => void; // Made optional
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
          <svg
            className={`size-3 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
            aria-hidden="true"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
          </svg>
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
