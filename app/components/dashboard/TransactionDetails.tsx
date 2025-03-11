import React from "react";

type TransactionDetailsProps = {
  transaction?: string;
  count?: number;
};

const TransactionDetails = ({
  transaction,
  count
}: TransactionDetailsProps) => {
  return (
    <>
      <div>
        <span className="font-semibold text-sm">Action Type: </span>
        <span className="text-xs">{transaction}</span>
      </div>
      <div>
        <span className="font-semibold text-sm">Processed Count: </span>
        <span className="text-xs">{count}</span>
      </div>
    </>
  );
};

export default TransactionDetails;
