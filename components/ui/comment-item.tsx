"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface CommentItemProps {
  content: string;
  user: {
    username: string;
    profile_picture_url: string | null;
  };
}

export function CommentItem({ content, user }: CommentItemProps) {
  return (
    <div className="flex gap-3 p-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.profile_picture_url || ""} alt={user.username} />
        <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm font-medium">{user.username}</p>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  );
}
