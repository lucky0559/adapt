"use server";

import { fetchPost, pulseApiUrl } from "@/lib";
import { headers } from "next/headers";

// const setAuthToken = async (token: string) => {
//   const headersList = await headers();
//   headersList.("x-access-token", token);
//   // pulseInstance.defaults.headers.common["x-access-token"] = token;
// };

export const getAuthToken = async () => {
  try {
    const response = await fetchPost(`${pulseApiUrl}/pulse/connect`, {
      service: process.env.service,
      clientid: process.env.clientid,
      secret: process.env.secret
    });

    const token = response.result;
    // await setAuthToken(token);
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    throw error;
  }
};
