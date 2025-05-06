"use client";
import {
  Home,
  LucideCompass,
  LucideMenu,
  LucideUsers,
  Settings,
} from "lucide-react";
import { AccountDropdown } from "./account-dropdown";
import { CreateButton } from "./post-creation/create-button";
import { ThemeSwitcher } from "./theme-switcher";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      type="button"
      className="md:hidden fixed left-4 top-4 z-40 p-2"
    >
      <LucideMenu className="h-6 w-6" />
    </button>
  );
}
interface LeftSidebarProps {
  user?: any;
}

export function LeftSidebar({ user }: LeftSidebarProps) {
  const guestlinks = [
    { label: "Explore", url: "#", icon: LucideCompass },
    { label: "Bar", url: "#", icon: LucideUsers },
  ];

  const authLinks = [
    { label: "Home", url: "/home", icon: Home },
    { label: "Explore", url: "/explore", icon: LucideCompass },
    { label: "Settings", url: "#", icon: Settings },
  ];

  const links = user ? authLinks : guestlinks;

  return (
    <Sidebar
      collapsible="icon"
      className="flex flex-col h-screen w-[var(--sidebar-width)]"
    >
      <div className="flex-1 overflow-y-auto">
        <SidebarHeader className="text-center">
          <p className="text-3xl font-bold pt-5">Fumblr</p>
        </SidebarHeader>
        <SidebarMenu className="pl-3 pt-2">
          {links.map((l) => (
            <SidebarMenuItem key={l.label}>
              <SidebarMenuButton asChild className="text-lg">
                <a href={l.url} className="flex-items center gap-3">
                  <l.icon className="!h-4 !w-4 flex-shrink-0" />
                  <span>{l.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {user && <AccountDropdown />}
          {/* Integrated theme switcher as a button -- wowzers how does she do it?? :O */}
          <SidebarMenuItem>
            <ThemeSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
      {user && (
        <div className="sticky bottom-0 p-4 bg-background">
          <CreateButton
            textSize="xl"
            iconSize={24}
            className="py-6 w-[calc(100%-2rem)]"
          />
        </div>
      )}
    </Sidebar>
  );
}
