"use server";

import { PaymentsReferenceCountType } from "@/types";
import { baseUrl } from "@/lib";

const getPaymentsReferenceCount = async () => {
  const res = await fetch(`${baseUrl}/payments`);
  const data = await res.json();
  const {
    currentPaymentsReference,
    yesterdayPaymentsReference
  }: PaymentsReferenceCountType = data.result;

  if (currentPaymentsReference && yesterdayPaymentsReference) {
    const paymentsRefComparisonDiff =
      currentPaymentsReference - yesterdayPaymentsReference;
    const paymentsRefComparisonAverage =
      (yesterdayPaymentsReference + currentPaymentsReference) / 2;
    const finalAverage =
      paymentsRefComparisonDiff / paymentsRefComparisonAverage;
    const paymentsRefComparisonPercentage = finalAverage * 100;

    return { currentPaymentsReference, paymentsRefComparisonPercentage };
  } else {
    return { currentPaymentsReference: 0, paymentsRefComparisonPercentage: 0 };
  }
};

export { getPaymentsReferenceCount };
