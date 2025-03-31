"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings2Icon } from "lucide-react";
import { Button } from "./ui/button";

const navigationMenuTriggerStyle = (isActive: boolean) => {
  return `
  ${isActive ? "border-b-[3px] border-b-blue-400 font-semibold relative bottom-[-1px]" : ""}
  transition-colors duration-200 px-4 py-3
  text-xl
  ${isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}
  hover:text-black dark:hover:text-white
  `;
};

interface TopBarProps {
  routes?: { label: string; href: string }[];
}

export const TopBar = ({ routes }: TopBarProps) => {
  const pathname = usePathname();

  const defaultRoutes = [
    { label: "For you", href: "/" },
    { label: "Following", href: "/following" },
    { label: "FumblrTV", href: "/fumblrtv" },
    { label: "Your tags", href: "/your-tags" },
  ];

  const finalRoutes = routes || defaultRoutes;

  return (
    <div className="flex items-center justify-between w-full border-b border-gray-200 dark:border-gray-800 bg-background pt-4 pb-1">
      <NavigationMenu className="max-w-full justify-start">
        <NavigationMenuList>
          {finalRoutes.map((route) => (
            <NavigationMenuItem key={route.label} className="p-1 text-lg">
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle(
                    pathname === route.href
                  )}
                >
                  {route.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Button
        className="hover:text-blue-400 transition-colors duration-200 p-2 h-10 mr-3"
        variant="ghost"
        size="icon"
      >
        <Settings2Icon className="h-5 w-5" />
      </Button>
    </div>
  );
};
