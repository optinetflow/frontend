import Link from "next/link";
import React from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout/Layout";

import { useRechargePackagesQuery } from "../graphql/queries/rechargePackages.graphql.interface";
import { toIRR } from "../helpers";

const RechargePackagesPage: NextPageWithLayout = () => {
  const rechargePackages = useRechargePackagesQuery({ fetchPolicy: "cache-and-network" });

  return (
    <div className="mx-auto my-12 flex max-w-xs flex-col justify-center" style={{ minHeight: "calc(100vh - 6rem)" }}>
      <div className="w-full space-y-4">
        {rechargePackages.data?.rechargePackages.map((pack) => (
          <Link
            href={`/buy-recharge-package/${pack.id}`}
            key={pack.id}
            className="mb-4 flex h-28 w-full items-center justify-between rounded-lg bg-slate-50 p-4 hover:bg-slate-100"
          >
            <div className="flex h-full flex-col items-center justify-between">
              <span className="flex h-full items-center text-xl text-slate-800">{toIRR(pack.amount)}</span>
              {/* <span className=" text-sm text-slate-600">{pack.discountPercent}% سود هر خرید</span> */}
            </div>

            <div className="rounded-full bg-slate-800 px-6 py-2 text-sm text-slate-100 hover:bg-slate-950">خرید</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RechargePackagesPage;

RechargePackagesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
