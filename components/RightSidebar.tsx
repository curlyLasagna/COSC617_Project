import { Sidebar, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

export const RightSidebar = () => {
  return (
    <Sidebar side="right" className="pt-5 hidden lg:inline">
      {/* Search Input */}
      <Input placeholder="Search Fumblr" className="m-5 w-fit" />

      {/* Trending Topics */}
      <SidebarMenu>
        {["#Ronaldo", "#Elden Ring", "#EPL", "#Arsenal"].map((topic) => (
          <SidebarMenuItem key={topic}>
            <SidebarMenuButton asChild>
              <a href="#">{topic}</a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      {/* Footer Links */}
      <SidebarFooter className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {["About", "Privacy Policy", "Terms of Service"].map((link) => (
          <a key={link} href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition">
            {link}
          </a>
        ))}
      </SidebarFooter>
    </Sidebar>
  );
};