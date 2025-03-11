"use client";

import React, { useState } from "react";
import { RefreshCcw, CheckCircle, XCircle, Server } from "lucide-react";
import { cn } from "@/lib/utils";

type CardServicesProps = {
  serviceName: string;
  restartFunction: () => Promise<void>;
  isHealthy: boolean | null;
};

export const Card = ({
  serviceName,
  restartFunction,
  isHealthy
}: CardServicesProps) => {
  const [isRestarting, setIsRestarting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRestart = async () => {
    setShowConfirm(true);
  };

  const confirmRestart = async () => {
    setShowConfirm(false);
    setIsRestarting(true);
    try {
      while (isHealthy) {
        await restartFunction();
      }
      const checkInterval = setInterval(async () => {
        if (isHealthy) {
          clearInterval(checkInterval);
          setIsRestarting(false);
        }
      }, 5000);
    } catch (error) {
      setIsRestarting(false);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center justify-center">
          <Server className="mr-2 h-5 w-5 text-gray-500" />
          {serviceName} Service
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              isRestarting
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            )}
          >
            {isRestarting ? "Restarting" : "Ready"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
          <div className="flex items-center justify-center space-x-2">
            {isHealthy === null ? (
              <span>Loading...</span>
            ) : isHealthy ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )}
            <span>
              {isHealthy === null
                ? null
                : isHealthy
                ? "API is running"
                : "API is down"}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
          <button
            onClick={handleRestart}
            disabled={isRestarting}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "h-10 px-4 py-2",
              isRestarting
                ? "bg-gray-100 text-gray-900"
                : "bg-gray-600 text-white hover:bg-gray-700"
            )}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            {isRestarting ? "Restarting..." : "Restart Service"}
          </button>
        </td>
      </tr>

      
      {showConfirm && (
        <tr>
          <td colSpan={4} className="px-6 py-4 text-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
              <p className="mb-4 text-lg">
                Are you sure you want to restart the service?
              </p>
              <div className="flex justify-around">
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={confirmRestart}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
