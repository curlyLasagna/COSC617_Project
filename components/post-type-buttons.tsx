"use client";
import { cn } from "@/lib/utils";

const postTypes = [
  { 
    name: "Text", 
    icon: "Aa",
    bgColor: "bg-blue-500 hover:bg-blue-600",
    size: "h-12 w-12"
  },
  { 
    name: "Photo", 
    icon: "📷",
    bgColor: "bg-green-500 hover:bg-green-600",
    size: "h-12 w-12"
  },
  { 
    name: "Link", 
    icon: "🔗",
    bgColor: "bg-yellow-500 hover:bg-yellow-600",
    size: "h-12 w-12"
  },
  { 
    name: "Video", 
    icon: "🎥",
    bgColor: "bg-red-500 hover:bg-red-600",
    size: "h-12 w-12"
  },
];

interface PostTypeButtonsProps {
  onSelect: (type: string) => void;
  className?: string;
  buttonSize?: string;
  iconSize?: string;
  showLabels?: boolean;
}

export function PostTypeButtons({ 
  onSelect, 
  className,
  buttonSize = "h-12 w-12",
  iconSize = "text-xl",
  showLabels = true
}: PostTypeButtonsProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      {postTypes.map((type) => (
        <button
          key={type.name}
          onClick={() => onSelect(type.name)}
          className={cn(
            "flex flex-col items-center gap-2",
            "transition-all duration-200 hover:scale-110"
          )}
          aria-label={`Create ${type.name} post`}
        >
          <div className={cn(
            "rounded-full flex items-center justify-center",
            "text-white",
            type.bgColor,
            buttonSize
          )}>
            <span className={iconSize}>{type.icon}</span>
          </div>
          {showLabels && (
            <span className="text-sm font-medium text-foreground">
              {type.name}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}