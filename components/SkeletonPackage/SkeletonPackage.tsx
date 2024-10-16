import React from "react"

const SkeletonPackage = () => {
  return (
    <div className="mb-4 flex h-32 w-full animate-pulse items-center justify-between rounded-lg bg-slate-50 p-4">
      <div className="flex h-full flex-col items-start justify-between">
        <div className="mb-2 h-6 w-24 rounded bg-gray-200" /> {/* Traffic */}
        <div className="mb-2 h-4 w-36 rounded bg-gray-200" /> {/* Expiration */}
        <div className="h-5 w-20 rounded bg-gray-200" /> {/* Price */}
      </div>
      <div className="h-8 w-24 rounded-full bg-blue-400 text-center text-sm text-slate-100"></div>
    </div>
  )
}

export default SkeletonPackage
