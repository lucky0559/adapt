import { getAuthToken, pulseApiUrl } from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getAuthToken();
    const result = await fetch(
      `${pulseApiUrl}/pulsegeneral_insurance/healthcheck`,
      {
        headers: {
          "x-access-token": token
        }
      }
    );
    const data = await result.json();
    return NextResponse.json(data);
  } catch (e) {}
}
