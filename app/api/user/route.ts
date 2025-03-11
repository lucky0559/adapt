import { NextResponse } from "next/server";
import { fetchPost } from "@/lib";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await fetchPost("https://svc-auth-as-svc-phlife-prd-az1-bpm-as.aks-lb1-phlife-prd-az1-gavfsh.pru.intranet.asia/ldap/validate", { result: body });
    return NextResponse.json(data.result);
  } catch (e) {}
}
