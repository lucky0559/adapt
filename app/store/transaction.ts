import { getAllTransactionsCount } from "@/actions";
import { Transaction } from "@/types";
import { create } from "zustand";

type ChartData = {
  month: string;
  updateProfile: number;
  changeDispatchAddress: number;
  updateBeneficiary: number;
};

type AllTransactionsCountType = {
  transactions?: ChartData[];
  areaDataKey?: string[];
  isLoading: boolean;
  getData: () => Promise<void>;
  setDataKey: (i: string[]) => void;
};

export const useTransactionStore = create<AllTransactionsCountType>(set => ({
  transactions: [],
  isLoading: true,
  areaDataKey: [],
  getData: async () => {
    const data = await getAllTransactionsCount();
    set({ transactions: data?.transactions });
  },
  setDataKey: (item: string[]) => {
    const key = [];
    set({ isLoading: true });
    if (item.includes("Update Profile")) {
      key.push("updateProfile");
    }
    if (item.includes("Change Dispatch Address")) {
      key.push("changeDispatchAddress");
    }
    if (item.includes("Update Beneficiary")) {
      key.push("updateBeneficiary");
    }
    set({
      areaDataKey: key
    });
    set({ isLoading: !!key.length ? false : true });
  }
}));
