import { getPolicyStatus } from "@/actions/policy/actions";
import { PolicyStatusCountType } from "@/types";
import { create } from "zustand";

type PolicyDataType = {
  label: string;
  color: string;
  policyStatus: string;
  policyStatusCode: string;
  count: number;
};

type PolicyChartDataType = {
  policyStatusCode: string;
  count: number;
  fill: string;
};

type PolicyStoreType = {
  policies: PolicyDataType[];
  policyChartConfig: {
    count: {
      label: string;
    };
  } | null;
  policyChartData: PolicyChartDataType[] | undefined;
  policyStatusCountType: PolicyStatusCountType[] | null;
  getPolicyStatus: () => Promise<void>;
};

export const usePolicyStore = create<PolicyStoreType>(set => ({
  policies: [],
  policyChartConfig: null,
  policyChartData: undefined,
  policyStatusCountType: null,
  getPolicyStatus: async () => {
    const res = await getPolicyStatus();
    set({
      policies: res.newData,
      policyChartConfig: res.chartConfig,
      policyChartData: res.chartData,
      policyStatusCountType: res.policyStatusCountType
    });
  }
}));
