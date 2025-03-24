import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Heart, MessageSquare, Repeat2, Bookmark } from "lucide-react";

export const PostActions = () => {
  const actions = [
    { icon: Heart, label: "Like" },
    { icon: Repeat2, label: "Reblog" },
    { icon: MessageSquare, label: "Reply" },
  ];

  return (
    <div className="flex gap-1">
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <action.icon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{action.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};