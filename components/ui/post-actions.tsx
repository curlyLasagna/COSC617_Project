import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Heart, MessageSquare, Repeat2 } from "lucide-react";

export const PostActions = () => {
  const actions = [
    { icon: MessageSquare, label: "Reply" },
    { icon: Repeat2, label: "Reblog" },
    { icon: Heart, label: "Like" }
  ];
// button formatting
  return (
    <div className="flex gap-2">
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <action.icon className="h-7 w-7" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{action.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};