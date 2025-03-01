"use client"
import { LucideCompass, LucideMenu, LucideUsers } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "./ui/sidebar";

export function CustomTrigger() {
    const { toggleSidebar } = useSidebar()
    return <button onClick={toggleSidebar} className="md:hidden fixed left-4 top-4 z-40">
        <LucideMenu className="h-4 w-4" />
    </button>
}

export function LeftSidebar() {
    const links = [
        { "label": "Foo", "url": "#", "icon": LucideCompass },
        { "label": "Bar", "url": "#", "icon": LucideUsers }
    ]
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "14rem",
                "--sidebar-width-mobile": "18rem"
            } as React.CSSProperties}>
            <Sidebar variant="floating" collapsible="icon" >
                <SidebarHeader className="text-center">
                    Fumblr
                </SidebarHeader>
                <SidebarMenu>
                    {links.map(l => (
                        <SidebarMenuItem key={l.label}>
                            <SidebarMenuButton asChild>
                                <a href={l.url}>
                                    <l.icon />
                                    <span>{l.label}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </Sidebar>
            <CustomTrigger />
        </SidebarProvider>
    )
}