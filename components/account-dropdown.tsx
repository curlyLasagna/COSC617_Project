"use client";
import { User, Heart, Users, LogOut } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <SidebarMenuItem>
      <div className="relative">
        <SidebarMenuButton 
          className="text-lg w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <User className="!h-4 !w-4 flex-shrink-0"/>
            <span>Account</span>
          </div>
        </SidebarMenuButton>
        
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1 bg-background rounded-md shadow-lg border">
            <button className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-accent">
              <Heart className="h-4 w-4"/>
              <span>Your Likes</span>
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-accent">
              <Users className="h-4 w-4"/>
              <span>Following</span>
            </button>
            <button 
              className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-accent text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4"/>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </SidebarMenuItem>
  );
}