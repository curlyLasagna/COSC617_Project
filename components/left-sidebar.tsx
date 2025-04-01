"use client";
import { LucideCompass, LucideMenu, LucideUsers, Palette } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { ThemeSwitcher } from "./theme-switcher";

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

export function LeftSidebar() {
  const links = [
    { "label": "Foo", "url": "#", "icon": LucideCompass },
    { "label": "Bar", "url": "#", "icon": LucideUsers }
  ]
  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader className="text-center">
        <p className="text-3xl font-bold pt-5">Fumblr</p>
      </SidebarHeader>
      <SidebarMenu className="pl-3 pt-2">
        {links.map(l => (
          <SidebarMenuItem key={l.label}>
            <SidebarMenuButton asChild className="text-lg">
              <a href={l.url} className = "flex-items center gap-3">
                <l.icon className="!h-4 !w-4 flex-shrink-0"/>
                <span>{l.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {/* Integrated theme switcher as a button -- wowzers how does she do it?? :O */}
        <SidebarMenuItem>
          <ThemeSwitcher />
        </SidebarMenuItem>
      </SidebarMenu>
    </Sidebar>
  )
}
