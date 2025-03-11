"use server";

import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui";
import React from "react";
import { CardParent } from "@/components/utilities";

const UtilitiesContent = lazy(async () => {
  return {
    default: () => (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Utilities
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-600">
          Services
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Health
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <CardParent />
          </table>
        </div>
      </div>
    )
  };
});

export default async function Utilities() {
  return (
    <Suspense
      fallback={
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 p-8">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton className="h-40 w-full mb-4 rounded-lg" />
              <Skeleton className="h-6 w-3/4 mb-2 rounded" />
              <Skeleton className="h-6 w-1/2 rounded" />
            </div>
          ))}
        </div>
      }
    >
      <UtilitiesContent />
    </Suspense>
  );
}
