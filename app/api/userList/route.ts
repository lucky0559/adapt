import { NextResponse } from "next/server";
import { apiDbBaseUrl } from "@/lib";

export async function GET() {
  try {
    const result = await fetch(`${apiDbBaseUrl}/getUser`);
    const data = await result.json();
    return NextResponse.json(data.result);
  } catch (e) {}
}
