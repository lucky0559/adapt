import { getCustomerType } from "@/actions/customer/actions";
import { CustomersDataType, CustomerType } from "@/types";
import { create } from "zustand";

type CustomerStoreType = {
  personalData: CustomersDataType[] | undefined;
  corporateData: CustomersDataType[] | undefined;
  customerTypeCount: CustomerType[] | undefined;
  getCustomerType: () => Promise<void>;
};

export const useCustomerStore = create<CustomerStoreType>(set => ({
  personalData: [],
  corporateData: [],
  customerTypeCount: [],
  getCustomerType: async () => {
    const res = await getCustomerType();
    set({
      personalData: res?.personalData,
      corporateData: res?.corporateData,
      customerTypeCount: res?.customerTypeCount
    });
  }
}));
