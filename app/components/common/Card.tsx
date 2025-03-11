import {
  CardContent,
  CardHeader,
  CardTitle,
  Card as Cardcn
} from "@/components/ui";
import { LucideProps } from "lucide-react";
import React, {
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes
} from "react";

type CardType = {
  title: string;
  desc?: string;
  data: string | number;
  Extra?: ReactElement;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  className?: string;
};

export const Card = async ({
  title,
  desc,
  data,
  Extra,
  Icon,
  className
}: CardType) => {
  return (
    <Cardcn className={`${className} relative shadow p-1 m-5`}>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
        <p className="text-gray-500">{desc}</p>
      </CardHeader>
      <CardContent className="flex flex-row justify-center items-center w-full space-x-20 px-6">
        <div className="flex self-start flex-col w-full">
          <span className="font-bold text-3xl">{data}</span>
          {Extra}
        </div>
        {/* {Icon && (
          <div>
            <Icon />
          </div>
        )} */}
      </CardContent>
    </Cardcn>
  );
};
