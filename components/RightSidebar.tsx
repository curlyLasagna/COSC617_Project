import { Sidebar, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const RightSidebar = () => {
  return (
    <Sidebar side="right" className="hidden lg:inline pt-8 h-full">
      {/* Search Input */}
      <div className="px-5 pb-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input  placeholder="Search Tumblr"
            className="w-full pl-10 py-5 text-base" // Increased size
          />
        </div>
      </div>
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