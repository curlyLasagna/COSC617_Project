"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import commentOnPost from "@/utils/posts/comment-action";
import likeAction from "@/utils/posts/like-action";
import { Heart, MessageSquare, Repeat2 } from "lucide-react";
import { useState } from "react";

export const PostActions = ({ postId }: { postId: number }) => {
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleComment = async () => {
    if (!comment.trim()) return;

    console.log("Post ID:", postId);
    const result = await commentOnPost(postId, comment);
    if (result.success) {
      setComment("");
      setIsOpen(false);
    }
  };

  const actions = [
    {
      icon: MessageSquare,
      label: "Reply",
      action: () => setIsOpen(true),
      render: (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <MessageSquare className="h-7 w-7" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleComment} disabled={!comment.trim()}>
                  Post
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ),
    },
    { icon: Repeat2, label: "Reblog", action: (postId: number) => {} },
    { icon: Heart, label: "Like", action: likeAction },
  ];

  return (
    <div className="flex gap-2">
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger asChild>
            {action.render || (
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => action.action(postId)}
              >
                <action.icon className="h-7 w-7" />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>{action.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
