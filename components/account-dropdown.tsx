"use client";
import { createClient } from "@/utils/supabase/client";
import { Heart, LogOut, StickyNote, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleDropDownToggle = async () => {
    if (!isOpen) {
      const { data: userDetails } = await supabase.auth.getUser();
      setUserId(userDetails.user?.id ?? null);
    }
    setIsOpen(!isOpen);
  };

  const handleBlogClick = () => {
    router.push(`/blogs/${userId}`);
  };

  return (
    <SidebarMenuItem>
      <div className="relative">
        <SidebarMenuButton
          className="text-lg w-full"
          onClick={handleDropDownToggle}
        >
          <div className="flex items-center gap-3">
            <User className="!h-4 !w-4 flex-shrink-0" />
            <span>Account</span>
          </div>
        </SidebarMenuButton>

        {isOpen && (
          <div className="ml-4 mt-1 space-y-1 bg-background rounded-md shadow-lg border">
            <button
              className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-accent"
              onClick={handleBlogClick}
            >
              <StickyNote className="h-4 w-4" />
              <span>My Blog</span>
            </button>
            <button
              className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-accent"
              onClick={() => router.push("/account/likes")}
            >
              <Heart className="h-4 w-4" />
              <span>Your Likes</span>
            </button>
            <button
              className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-accent"
              onClick={() => router.push("/account/following")}
            >
              <Users className="h-4 w-4" />
              <span>Following</span>
            </button>
            <button
              className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-accent text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </SidebarMenuItem>
  );
}
