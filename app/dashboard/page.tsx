"use server";

import { LineChartLabel, Pie } from "@/components/charts";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui";
import { Card } from "@/components/common/Card";
import { HandCoins, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getPaymentsReferenceCount } from "@/actions/payment/actions";
import { getPolicyStatus } from "@/actions/policy/actions";
import { ChartConfig } from "@/components/ui";
import { TransactionsEnum } from "@/enum/transaction";
import { AreaTrend } from "@/components/dashboard";
import { Card as CustomerCard } from "@/components/customers";
import Link from "next/link";
import { PaymentModal } from "@/components/dashboard/PaymentModal";

const DashboardContent = lazy(async () => {
  const [
    { currentPaymentsReference, paymentsRefComparisonPercentage },
    { newData, chartConfig, chartData }
  ] = await Promise.all([getPaymentsReferenceCount(), getPolicyStatus()]);

  const paymentsRefPercentage = paymentsRefComparisonPercentage.toFixed();

  const cConfig = {
    updateProfile: {
      label: TransactionsEnum.UPDATE_PROFILE,
      color: "hsl(var(--chart-3))"
      // icon: TrendingUp
    },
    changeDispatchAddress: {
      label: TransactionsEnum.CHANGE_DISPATCH_ADDRESS,
      color: "hsl(var(--chart-1))"
      // icon: TrendingDown
    },
    updateBeneficiary: {
      label: TransactionsEnum.UPDATE_BENEFICIARY,
      color: "hsl(var(--chart-2))"
      // icon: TrendingUp
    }
  } satisfies ChartConfig;

  const areaTrendProps = {
    title: "Actions",
    description: "Showing total actions for the last 6 months",
    chartConfig: cConfig,
    axisDataKey: "month"
  };

  return {
    default: () => (
      <>
        <div className="grid grid-cols-3 auto-rows-auto gap-0 p-2">
          <Card
            title="Active Users"
            desc="Total active users"
            data={"214"}
            Extra={<LineChartLabel />}
            Icon={Users}
            className="!w-auto"
          />
          <div className="col-start-2 row-start-1 flex flex-col">
            <Link href="/dashboard?showPaymentModal=y">
              <Card
                className="h-auto !max-w-none !w-auto hover:cursor-pointer hover:opacity-50 transition duration-300 ease-in-out hover:border-red-600"
                title="Today Payments Count"
                data={currentPaymentsReference || "Unavailable"}
                Extra={
                  <div className="flex">
                    {currentPaymentsReference ? (
                      <>
                        {paymentsRefComparisonPercentage >= 0 ? (
                          <>
                            <ArrowUpRight
                              size={16}
                              color="green"
                              className="self-center mr-1"
                            />
                            <span className="text-green-500 text-sm mr-1">
                              +{paymentsRefPercentage}%
                            </span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight
                              size={16}
                              color="red"
                              className="self-center mr-1"
                            />
                            <span className="text-red-500 text-sm mr-1">
                              {paymentsRefPercentage}%
                            </span>
                          </>
                        )}
                        <span className="text-sm"> vs last day</span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                }
                Icon={HandCoins}
              />
            </Link>
            <CustomerCard />
          </div>
          <PaymentModal />
          <Pie
            data={newData}
            chartConfig={chartConfig}
            chartData={chartData}
            dataKey="count"
            nameKey="policyStatusCode"
            pieLabel="Policies"
            title="Policy Status Count"
            className="!h-auto !w-auto row-start-1 col-start-3"
          />
        </div>
        <div className="col-span-2 p-2">
          <AreaTrend areaTrendProps={areaTrendProps} />
        </div>
      </>
    )
  };
});

export default async function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-3 auto-rows-auto gap-4 p-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton className="h-40 w-full mb-4 rounded-lg" />
              <Skeleton className="h-6 w-3/4 mb-2 rounded" />
              <Skeleton className="h-6 w-1/2 rounded" />
            </div>
          ))}
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
