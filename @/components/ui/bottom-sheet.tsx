import React, { ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="mb-2 rounded-xl border border-gray-200 dark:border-gray-700">
      <h2>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 border-b border-gray-200 p-5 font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${title}`}
        >
          <span>{title}</span>
          <svg
            className={`size-3 transition-transform duration-300${isOpen ? "rotate-180" : "rotate-0"}`}
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
          className="border-t border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900"
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
