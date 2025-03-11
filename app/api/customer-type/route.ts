import { apiDbBaseUrl } from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await fetch(`${apiDbBaseUrl}/customerTypeCount`);
    const data = await result.json();

    return NextResponse.json(data);
  } catch (e) {}
}
