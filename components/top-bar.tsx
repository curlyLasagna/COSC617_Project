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
    ${isActive ? "border-b-2 border-b-blue-400 font-semibold" : ""}
    hover:border-b-2 hover:border-b-blue-400
    transition-colors duration-200 p-2
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
    { label: "TumblerTV", href: "/tumblertv" },
    { label: "Your tags", href: "/your-tags" },
  ];

  const finalRoutes = routes || defaultRoutes;

  return (
    <>
      <div className="flex items-center justify-between w-full p-5">
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
          className="hover:text-blue-400 transition-colors duration-200"
          variant="link"
        >
          <Settings2Icon />
        </Button>
      </div>
    </>
  );
};
