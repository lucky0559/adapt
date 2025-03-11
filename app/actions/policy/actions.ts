"use server";

import { ChartConfig } from "@/components/ui";
import { baseUrl, chartColor } from "@/lib";
import { PolicyStatusCountType } from "@/types";
import { ObjectType } from "@/types/ObjectType";

const getPolicyStatus = async () => {
  const res = await fetch(`${baseUrl}/policy-status`);
  const data = await res.json();
  const policyStatusCountType: PolicyStatusCountType[] = data.result;
  const newData = policyStatusCountType?.map((item, i) => ({
    ...item,
    label: item.policyStatus,
    color: chartColor[i]
  }));

  const chartConfigObject: ObjectType = {};
  const chartData = newData?.map(item => ({
    policyStatusCode: item.policyStatusCode,
    count: item.count,
    fill: `var(--color-${item.policyStatusCode})`
  }));

  newData.forEach(item => {
    chartConfigObject[item.policyStatusCode] = item;
  });

  const chartConfig = {
    count: { label: "Policies" },
    ...chartConfigObject
  } satisfies ChartConfig;

  return { newData, chartConfig, chartData, policyStatusCountType };
};

export { getPolicyStatus };
