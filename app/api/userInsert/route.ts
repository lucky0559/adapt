import { NextResponse } from "next/server";
import { apiDbBaseUrl,fetchPost } from "@/lib";

export async function POST(req:Request) {
  try {
    const body = await req.json();
    const data = await fetchPost(`${apiDbBaseUrl}/addUser`, body);
    return NextResponse.json(data.result);
  } catch (error) {}
}
