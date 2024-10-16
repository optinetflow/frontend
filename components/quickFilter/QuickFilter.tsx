import React from "react"
import { PackageCategory } from "../../src/graphql/__generated__/schema.graphql"

export interface Filter {
  key?: string | null
  value?: string | number | null | PackageCategory
  text?: string | null
  toggleAllFilters?: boolean
  icon?: React.JSX.Element
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
        {filters.map(({ text, key, value, toggleAllFilters, icon }, index) => (
          <div
            onClick={() => setFilter({ key, value, text, toggleAllFilters })}
            key={`${key}-${index}`}
            className={`flex cursor-pointer items-center whitespace-nowrap rounded-full border px-4 py-1.5 text-sm shadow-sm transition-all ${
              filter.key === key && filter.value === value
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 text-slate-600"
            }`}
            style={index === 0 ? { marginInlineEnd: "8px" } : {}}
          >
            {icon && <span className="mr-1">{icon}</span>} {/* Render the icon if it exists */}
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickFilter
