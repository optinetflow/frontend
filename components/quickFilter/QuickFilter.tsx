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
  className?: string
}

const QuickFilter: React.FC<QuickFiltersProp> = ({ filter, setFilter, filters, className }) => {
  return (
    <div className={`${className}`}>
      <div className="no-scrollbar flex space-x-2 overflow-x-auto">
        {filters.map(({ text, key, value, toggleAllFilters, icon }, index) => (
          <div
            onClick={() =>
              filter.key === key && filter.value === value
                ? setFilter({})
                : setFilter({ key, value, text, toggleAllFilters })
            }
            key={`${key}-${index}`}
            className={`flex cursor-pointer items-center whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-all ${
              filter.key === key && filter.value === value
                ? "border-slate-600 bg-slate-600 text-white"
                : "border-slate-300 text-slate-600"
            }`}
            style={index === 0 ? { marginInlineEnd: "8px" } : {}}
          >
            {icon && <span className="mr-1">{icon}</span>}
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickFilter
