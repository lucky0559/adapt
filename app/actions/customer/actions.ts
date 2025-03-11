"use server";

import { baseUrl, chartColor } from "@/lib";
import { CustomerType } from "@/types";

const getCustomerType = async () => {
  try {
    const res = await fetch(`${baseUrl}/customer-type`);
    const data = await res.json();
    const customerTypeCount: CustomerType[] = data.result;
    const newDataCustomerType = customerTypeCount?.map((item, i) => ({
      ...item,
      label: item.customer_type,
      color: chartColor[i]
    }));

    const personalData = newDataCustomerType?.filter(
      item => item.customerType === "P"
    );
    const corporateData = newDataCustomerType?.filter(
      item => item.customerType === "C"
    );

    return {
      personalData,
      corporateData,
      customerTypeCount
    };
  } catch (e) {}
};

export { getCustomerType };
