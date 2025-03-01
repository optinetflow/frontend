import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Copyable } from "../components/Copyable/Copyable";

import { UserPackagesQuery } from "../graphql/queries/userPackages.graphql.interface";
import { bytesToGB, getRemainingDays, isRecentlyConnected, remainingTimeToWords, roundTo, timeSince } from "../helpers";
import { ArrowPathIcon } from "../icons";

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;
interface ProgressBarProp {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProp> = ({ progress }) => {
  const rounded = Math.round(progress);
  return (
    <div className="ltr flex-1 rounded-full bg-slate-200">
      <div
        className="rounded-full bg-slate-900 py-1 text-center font-sans text-xs font-medium leading-none text-neutral-200"
        style={{ width: `${rounded}%` }}
      ></div>
    </div>
  );
};

interface StatProps {
  pack: ArrayElement<UserPackagesQuery["userPackages"]>;
  onRenewClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isFree?: boolean;
}

export function Stat({ pack, onRenewClick, isFree = false }: StatProps) {
  const remainingTime = pack.expiryTime > 0 ? pack.expiryTime - Date.now() : -Number(pack.expiryTime);
  const totalTraffic = roundTo(bytesToGB(pack.totalTraffic), 2);
  const remainingTraffic = roundTo(bytesToGB(pack.remainingTraffic), 2);
  const remainingDays = getRemainingDays(pack.expiryTime);

  const remainingTimeWords =
    remainingTime > 0 ? `${remainingTimeToWords(remainingTime)} مانده تا اتمام بسته` : "بسته‌ی شما منقضی شده است";
  const expiryTimeNote = pack.expiryTime === 0 ? "بدون محدودیت زمان" : remainingTimeWords;
  const packageNote = remainingTraffic > 0 ? expiryTimeNote : "حجم بسته تمام شده است";

  const showRenewBtn = true || remainingDays <= 2 || pack.totalTraffic - pack.remainingTraffic >= pack.totalTraffic * 0.85;

  const lastConnectedAt = pack?.lastConnectedAt ? new Date(pack?.lastConnectedAt) : undefined;
  const isOnline = lastConnectedAt && isRecentlyConnected(lastConnectedAt);
  return (
    <div className="space-y-4 rounded-md bg-slate-50 p-4">
      <div className="flex items-center justify-between pb-6">
        <div className="truncate  text-lg font-black text-slate-800">{pack.name}</div>
        {lastConnectedAt && (
          <div className="mr-4 whitespace-nowrap text-left text-xs text-slate-300">
            {isOnline ? "آنلاین" : timeSince(lastConnectedAt)}
          </div>
        )}
      </div>
      <div className="flex justify-between text-xs font-thin text-slate-500">
        <div>{packageNote}</div>
        <div className="rounded bg-slate-400 px-2 py-0.5 text-[10px] text-white">
          {pack.categoryFa || pack.category}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="ltr ml-4 pt-1 text-sm font-black text-slate-500">
          {remainingTraffic > 0 ? remainingTraffic : 0} GB
        </div>
        <ProgressBar progress={((remainingTraffic > 0 ? remainingTraffic : 0) / totalTraffic) * 100} />
      </div>

      {showRenewBtn && !isFree ? (
        <Link
          className="flex"
          href={`/packages?category=${pack.category}&userPackageId=${pack.id}`}
          onClick={onRenewClick}
        >
          <Button variant="outline" className="flex w-full text-slate-600">
            <ArrowPathIcon className="ml-2 size-5" />
            <span>تمدید بسته</span>
          </Button>
        </Link>
      ) : (
        <Copyable className="text-xs font-thin text-slate-400" content={pack.link} />
      )}
    </div>
  );
}
