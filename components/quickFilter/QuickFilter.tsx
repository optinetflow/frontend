import React from "react"
import { PackageCategory } from "../../src/graphql/__generated__/schema.graphql"

export interface Filter {
  key: string | null
  value: string | null | PackageCategory
  text: string | null
}

interface QuickFiltersProp {
  filter: Filter
  setFilter: (filter: Filter) => void
  filters: Filter[]
}

const QuickFilter: React.FC<QuickFiltersProp> = ({ filter, setFilter, filters }) => {
  return (
    <div className="mb-4">
      <div className="no-scrollbar flex space-x-2 overflow-x-auto">
        <div
          onClick={() => setFilter({ key: null, value: null, text: null })}
          className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-sm shadow-sm transition-all ${
            filter.key === null && filter.value === null
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 text-slate-600"
          }`}
          style={{ marginInlineEnd: "8px" }}
        >
          همه
        </div>

        {filters.map(({ text, key, value }, index) => (
          <div
            onClick={() => setFilter({ key, value, text })}
            key={`${key}-${index}`}
            className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-sm shadow-sm transition-all ${
              filter.key === key && filter.value === value
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 text-slate-600"
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
