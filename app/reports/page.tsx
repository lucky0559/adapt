"use server";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui";
import { CardParent, DownloadButton } from "@/components/reports";

const ReportsContent = lazy(async () => {
  return {
    default: () => (
      <div className="container mx-auto p-2">
        <h1 className="text-2xl font-bold text-center mb-6">Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardParent />
        </div>
      </div>
    )
  };
});

export default async function Reports() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-40 w-full mb-4" />
          ))}
        </div>
      }
    >
      <div className="flex justify-end mb-4">
        <DownloadButton />
      </div>
      <ReportsContent />
    </Suspense>
  );
}
