import { Sidebar, SidebarProvider, SidebarHeader, SidebarMenuItem, SidebarMenu, SidebarMenuButton, useSidebar } from "./ui/sidebar";
import { LucideCompass, LucideUsers } from "lucide-react";

export function LeftSidebar() {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()
    const links = [
        { "label": "Foo", "url": "#", "icon": LucideCompass },
        { "label": "Bar", "url": "#", "icon": LucideUsers }
    ]
    return (
        <SidebarProvider>
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
        </SidebarProvider>
    )
}