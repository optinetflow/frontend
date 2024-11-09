import React from "react";

const PromotionCodeCardSkeleton: React.FC = () => {
  return (
    <div className="mb-4 flex w-full animate-pulse items-center justify-between rounded-lg bg-slate-100 p-4">
      <div>
        <div className="mb-2 h-4 w-32 rounded bg-slate-300"></div>
        <div className="h-3 w-24 rounded bg-slate-300"></div>
      </div>
      <div className="flex space-x-4">
        <div className="size-6 rounded-full bg-slate-300"></div>
        <div className="size-6 rounded-full bg-slate-300"></div>
      </div>
    </div>
  );
};

export default PromotionCodeCardSkeleton;
