import React from "react"
import { PackageCategory } from "../../src/graphql/__generated__/schema.graphql";

export interface Filter {
    key: string | null;
    value: string | null | PackageCategory;
    text: string | null;
}

interface QuickFiltersProp {
  filter: Filter
  setFilter: (filter: Filter) => void
  filters: Filter[]
}

const QuickFilter: React.FC<QuickFiltersProp> = ({ filter, setFilter, filters }) => {
  return (
    <div className="mb-4">
      <div className="flex space-x-2 overflow-x-auto no-scrollbar">
        <div
          onClick={() => setFilter({ key: null, value: null, text: null })}
          className={`cursor-pointer rounded-full border py-1.5 px-4 text-sm transition-all shadow-sm whitespace-nowrap ${
            filter.key === null && filter.value === null ? "bg-blue-600 text-white border-blue-600" : "text-slate-600 border-slate-300"
          }`}
          style={{ marginInlineEnd: '8px' }}
        >
          همه
        </div>

        {filters.map(({ text, key, value }, index) => (
          <div
            onClick={() => setFilter({ key, value, text })}
            key={`${key}-${index}`}
            className={`cursor-pointer rounded-full border py-1.5 px-4 text-sm transition-all shadow-sm whitespace-nowrap ${
              filter.key === key && filter.value === value
                ? "bg-blue-600 text-white border-blue-600"
                : "text-slate-600 border-slate-300"
            }`}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickFilter
