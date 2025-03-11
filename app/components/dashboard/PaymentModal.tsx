"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable";
import { productsMockData } from "../../../mockData/productMockData";
import { Button } from "@/components/ui";
import { ArrowUpDown } from "lucide-react";
import { formatDate } from "@/lib";

type PaymentModalProps = {
  onClose?: () => void;
  children?: React.ReactNode;
};

export type Product = {
  productName: string;
  date: string;
  totalCountSold: number;
  totalAmount: number;
};

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-start"
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.original.date);
      const dateB = new Date(rowB.original.date);
      return dateA.getTime() - dateB.getTime();
    },
    accessorFn: row => formatDate(row.date)
  },
  {
    accessorKey: "totalCountSold",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Count Sold
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
    // accessorFn: row => row.totalCountSold.toLocaleString()
  },
  {
    accessorKey: "totalAmount",
    // header: "Total Amount Sold"
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount Sold
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: row => "₱" + row.totalAmount.toLocaleString()
    // accessorFn: row => "₱" + row.totalAmount
  }
];

export const PaymentModal = ({ onClose }: PaymentModalProps) => {
  const searchParams = useSearchParams();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showPaymentModal = searchParams.get("showPaymentModal");

  useEffect(() => {
    if (showPaymentModal === "y") {
      return modalRef.current?.showModal();
    } else modalRef.current?.close();
  }, [showPaymentModal]);

  const closeModal = () => {
    modalRef.current?.close();
    window.history.replaceState(null, "", "/dashboard");
    onClose?.();
  };

  const modal: JSX.Element | null =
    showPaymentModal === "y" ? (
      <dialog ref={modalRef} className="bg-slate-50 rounded-xl p-4 w-3/4">
        <div>
          <DataTable data={productsMockData} columns={productColumns} />
          <Button onClick={closeModal} className="mt-4 p-4">
            Close
          </Button>
        </div>
      </dialog>
    ) : null;

  return modal;
};
