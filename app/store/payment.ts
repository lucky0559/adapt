import { getPaymentsReferenceCount } from "@/actions/payment/actions";
import { create } from "zustand";

type PaymentStoreType = {
  currentPaymentsReference: number;
  paymentsRefComparisonPercentage: number;
  getPaymentsReferenceCount: () => Promise<void>;
};

export const usePaymentStore = create<PaymentStoreType>(set => ({
  currentPaymentsReference: 0,
  paymentsRefComparisonPercentage: 0,
  getPaymentsReferenceCount: async () => {
    const res = await getPaymentsReferenceCount();
    set({
      currentPaymentsReference: res.currentPaymentsReference,
      paymentsRefComparisonPercentage: res.paymentsRefComparisonPercentage
    });
  }
}));
