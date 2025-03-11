import { decrypt, verifyRole } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/reports", "/users", "/utilities"];
const publicRoutes = ["/"];
const protectedAdminRoutes = ["/reports", "/users", "/utilities"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isAdmin = await verifyRole();

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    // const response = NextResponse.redirect(new URL("/", req.nextUrl));
    // response.headers.set("x-pathname", req.nextUrl.pathname);
    // return response;
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (
    (isPublicRoute && session?.userId) ||
    (protectedAdminRoutes.includes(path) && !isAdmin)
  ) {
    // const response = NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    // response.headers.set("x-pathname", req.nextUrl.pathname);
    // return response;
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  const response = NextResponse.next();
  response.headers.set("x-pathname", req.nextUrl.pathname);
  return response;
}
