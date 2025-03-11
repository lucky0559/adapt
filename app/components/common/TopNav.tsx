"use client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { handleLogout } from "./SideNav";
import { usePathname } from "next/navigation";
import { josefin } from "@/lib";

export const TopNav = () => {
  const pathname = usePathname();
  if (pathname === "/") {
    return <></>;
  }
  return (
    <nav className="p-4 w-full fixed top-0 bg-red-700 z-50">
      <div className=" mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className={`${josefin.className} text-xl text-white font-bold`}>
            PruServices Adaption
          </span>
        </Link>
        <div className="space-x-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md transition duration-300"
          >
            <LogOut className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
