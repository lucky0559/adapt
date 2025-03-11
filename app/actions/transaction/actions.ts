"use server";

import { baseUrl, getMonthRange } from "@/lib";
import { Transaction } from "@/types";

interface TransactionsResponse {
  transactions: Transaction[];
}

export async function getAllTransactionsCount(): Promise<TransactionsResponse> {
  try {
    const res = await fetch(`${baseUrl}/transaction`);
    const data = await res.json();
    const transactions: Transaction[] = data.result;

    const sortedData = transactions.sort((a, b) => {
      const [yearA, monthA] = a.month.split("-").map(Number);
      const [yearB, monthB] = b.month.split("-").map(Number);
      return yearA - yearB || monthA - monthB;
    });

    const slicedData = sortedData.slice(0, 5);

    const months = getMonthRange(6);
    if (months.length < 6) {
      throw new Error("Invalid months data");
    }

    slicedData.forEach((item, index) => {
      if (index < 5) {
        item.month = months[5 - index];
      }
    });

    return { transactions: slicedData };
  } catch (error) {
    console.error(error);
    return { transactions: [] };
  }
}
