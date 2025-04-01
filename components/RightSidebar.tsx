import { Sidebar, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const RightSidebar = () => {
  return (
    <div className="hidden lg:flex flex-col h-full pt-2 w-80">
    <Sidebar side="right" className="flex-1 w-full">
      {/* Search Input */}
      <div className="px-2 pb-3">
        <div className="relative mx-0">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-6 text-gray-400" />
          <Input  placeholder="Search Fumblr"
            className="w-full pl-12 py-5 text-base rounded-full" // Increased size
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
    </div>
  );
};