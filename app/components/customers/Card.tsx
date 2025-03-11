"use client";

import {
  CardContent,
  CardHeader,
  CardTitle,
  Card as Cardcn
} from "@/components/ui";
import { useCustomerStore } from "@/store/customer";
import { Home, Building2 } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
type CustomerCardProps = {
  className?: string;
};
export const Card = ({ className }: CustomerCardProps) => {
  const { personalData, corporateData, getCustomerType } = useCustomerStore(
    useShallow(state => state)
  );

  useEffect(() => {
    (async () => {
      await getCustomerType();
    })();
  }, []);

  return (
    <Cardcn className={`${className} relative shadow p-1 m-5`}>
      <CardHeader>
        <CardTitle className="text-sm">Account Type</CardTitle>
        <p className="text-gray-500">Corporate & Personal</p>
      </CardHeader>
      <CardContent className="flex flex-row justify-center items-center w-full space-x-20 px-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="text-blue-500" size={20} />
                  <span className="capitalize text-sm">
                    {corporateData?.[0]?.label.toLowerCase()}
                  </span>
                </div>
              </th>
              <th className="px-4">
                <div className="flex items-center space-x-2">
                  <Home className="text-red-500" size={20} />
                  <span className="capitalize text-sm">
                    {personalData?.[0]?.label.toLowerCase()}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 text-sm">
                {corporateData?.[0]?.count.toLocaleString()}
              </td>
              <td className="px-4 text-sm">
                {personalData?.[0]?.count.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Cardcn>
  );
};
