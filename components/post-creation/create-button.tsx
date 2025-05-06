"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { CreatePostModal } from "./create-post-modal";

interface CreateButtonProps {
  className?: string;
  iconSize?: number;
  textSize?: "base" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export function CreateButton({
  className = "",
  iconSize = 20,
  textSize = "lg",
  rounded = "full",
}: CreateButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const handlePostSelect = (type: string) => {
    console.log("Selected post type:", type);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "w-full bg-sky-500 hover:bg-sky-600 text-white transition-all",
          roundedClasses[rounded],
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center gap-2",
            `text-${textSize}`,
          )}
        >
          <Pencil size={iconSize} className="shrink-0" />
          <span>Create</span>
        </div>
      </Button>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handlePostSelect}
      />
    </>
  );
}
