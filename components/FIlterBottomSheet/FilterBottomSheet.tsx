import React, { useEffect, useState } from "react";
import { formatDuration } from "helpers";
import { Filter } from "../../components/quickFilter/QuickFilter";

interface FiltersProps {
  isOpen: boolean;
  setFilter: (filters: Filter[]) => void;
  onClose: () => void;
}

const categories = [
  { text: "بسیار با کیفیت", value: "QUALITY" },
  { text: "بسته های اقتصادی", value: "ECONOMIC" },
];

const expirationDaysOptions = [15, 30, 60, 90];

const Filters: React.FC<FiltersProps> = ({ isOpen, onClose, setFilter }) => {
  const [isVisible, setIsVisible] = useState(false); // State to control the visibility of the sheet (for animation)
  const [shouldRender, setShouldRender] = useState(isOpen); // Tracks if component should be rendered

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExpirationDays, setSelectedExpirationDays] = useState<number | null>(null);
  const handleCategorySelect = (value: string) => {
    setSelectedCategory((prev) => (prev === value ? null : value)); // Toggle selection
  };

  const handleExpirationDaysSelect = (value: number) => {
    setSelectedExpirationDays((prev) => (prev === value ? null : value)); // Toggle selection
  };
  const handleSubmit = () => {
    const filters = [];
    if (selectedCategory) {
      filters.push({ key: "category", value: selectedCategory });
    }
    if (selectedExpirationDays) {
      filters.push({ key: "expirationDays", value: selectedExpirationDays });
    }
    setFilter(filters);
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

      {/* Bottom sheet content */}
      <div
        className={`relative z-40 w-full max-w-lg rounded-t-lg bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "75%" }} // Set height to 75% of the screen
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">فیلترها</h2>
          <button onClick={onClose} className="text-gray-500">
            بستن
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-grow overflow-y-auto px-4 pb-20">
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold">نوع بسته</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <div
                  key={category.value}
                  onClick={() => handleCategorySelect(category.value)}
                  className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-sm shadow-sm transition-all ${
                    selectedCategory === category.value
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 text-slate-600"
                  }`}
                  style={index === 0 ? { marginInlineEnd: "8px" } : {}}
                >
                  {category.text}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold">مدت اعتبار بسته</h3>
            <div className="flex flex-wrap gap-2">
              {expirationDaysOptions.map((day) => (
                <div
                  key={day}
                  onClick={() => handleExpirationDaysSelect(day)}
                  className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-sm shadow-sm transition-all ${
                    selectedExpirationDays === day
                      ? "border-gray-600 bg-gray-600 text-white"
                      : "border-slate-300 text-slate-600"
                  }`}
                >
                  {formatDuration(day)}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 bg-white p-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-md bg-slate-800 px-4 py-3 text-white hover:bg-slate-700"
            >
              اعمال فیلتر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
