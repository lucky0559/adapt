import type { Metadata } from "next";
import "./globals.css";
import { SideNav } from "@/components/common";
import { rubik, verifyRole } from "@/lib";
import { headers } from "next/headers";
import { TopNav } from "./components/common/TopNav";

export const metadata: Metadata = {
  title: "Adoption",
  description: "Adoption"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await verifyRole();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  return (
    <html lang="en" className={`${rubik.className} tracking-tight`}>
      <body className={`${pathname !== "/" ? "grid grid-cols-5 gap-4" : ""}`}>
        <TopNav />
        <SideNav isAdmin={isAdmin} />
        <div
          className={`${
            pathname !== "/"
              ? "border-2 rounded-lg shadow-md m-8 col-span-4 mt-20"
              : ""
          }`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
