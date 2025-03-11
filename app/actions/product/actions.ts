"use server";

import { baseUrl } from "@/lib";

const getProductsSold = async () => {
  try {
    const res = await fetch(`${baseUrl}/product-sold`);
    const data = await res.json();
    return data.result;
  } catch (e) {}
};

export { getProductsSold };
