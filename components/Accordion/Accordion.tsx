import React, { Children, cloneElement, ReactElement, useState } from "react";
import { AccordionItemProps } from "./AccordionItem"; // Adjust the path as necessary

interface AccordionProps {
  className?: string;
  children: ReactElement<AccordionItemProps>[];
}

const Accordion: React.FC<AccordionProps> = ({ children, className = "" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={className}>
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isOpen: openIndex === index,
          onClick: () => handleClick(index),
        })
      )}
    </div>
  );
};

export default Accordion;
