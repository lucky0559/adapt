"use client";

import { Card } from "@/components/reports/Card";
import { useCustomerStore, usePolicyStore, useTransactionStore } from "@/store";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const CardParent = () => {
  const { policyStatusCountType, getPolicyStatus } = usePolicyStore(
    useShallow(state => state)
  );
  const { transactions, getData } = useTransactionStore(
    useShallow(state => state)
  );
  const { customerTypeCount, getCustomerType } = useCustomerStore(
    useShallow(state => state)
  );

  useEffect(() => {
    (async () => {
      await Promise.all([getPolicyStatus(), getData(), getCustomerType()]);
    })();
  }, []);

  return (
    <>
      <Card data={transactions} title="Payment History" />
      <Card data={policyStatusCountType} title="Policy Status" />
      <Card data={customerTypeCount} title="Customer Account Type" />
    </>
  );
};

export default CardParent;
