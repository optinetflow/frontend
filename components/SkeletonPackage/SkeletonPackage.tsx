// components/Skeleton/SkeletonPackage.tsx

import React from "react";

const SkeletonPackage = () => {
  return (
    <div className="mb-4 flex h-32 w-full items-center justify-between rounded-lg bg-slate-50 p-4 animate-pulse">
      <div className="flex h-full flex-col items-start justify-between">
        <div className="h-6 w-24 bg-gray-200 rounded mb-2" /> {/* Traffic */}
        <div className="h-4 w-36 bg-gray-200 rounded mb-2" /> {/* Expiration */}
        <div className="h-5 w-20 bg-gray-200 rounded" /> {/* Price */}
      </div>
      <div className="rounded-full bg-slate-800 h-8 w-24 text-center text-sm text-slate-100"></div>
    </div>
  );
};

export default SkeletonPackage;
