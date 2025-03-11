"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  Users,
  StickyNote,
  LogOut
} from "lucide-react";
import { Button, ScrollArea } from "@/components/ui";
import { useState } from "react";
import { logout } from "@/actions/user/actions";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Reports", href: "/reports", icon: StickyNote },
  { name: "Users", href: "/users", icon: Users },
  { name: "Utilities", href: "/utilities", icon: Settings }
];

type SideNavProps = {
  isAdmin: boolean;
};

export const SideNav = ({ isAdmin }: SideNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  if (pathname === "/") {
    return <></>;
  }

  return (
    <div className="mt-20 h-full">
      {/* burger */}
      {/* <div className="tablet:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMenu} className="p-2 flex flex-col space-y-1">
          <div className="w-6 h-0.5 bg-black"></div>
          <div className="w-6 h-0.5 bg-black"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>
      </div>

      <aside
        className={`fixed top-0 left-0 w-[240px] h-full bg-white z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:flex md:w-[240px]`}
      > */}

      <ScrollArea className="flex-grow">
        <nav className="flex flex-col space-y-2 p-2">          
          {!isAdmin ? (
            <Link
              key={menuItems[0].href}
              href={menuItems[0].href}
              className="h-12"
            >
              <Button
                variant="secondary"
                className="font-semibold w-full h-full justify-start"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                {menuItems[0].name}
              </Button>
            </Link>
          ) : (
            menuItems.map(item => (
              <Link key={item.href} href={item.href} className="h-12">
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`${
                    pathname === item.href && "font-semibold"
                  } w-full h-full justify-start`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))
          )}
        </nav>
      </ScrollArea>
      {/* </aside> */}
 
    </div>
  );
};

export const handleLogout = async () => {
  await logout();
};
