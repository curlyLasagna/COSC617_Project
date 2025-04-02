import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Ellipsis } from "lucide-react";
import Link from "next/link";

interface UserAvatarProps {
  user: {
    username: string;
    profile_picture_url: string | null;
  };
  profilePic: string;
  isFollowing: boolean;
  postTime: Date;
}

export const UserAvatar = ({ user, isFollowing, postTime}: UserAvatarProps) => {
  const formattedDate = postTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex justify-between items-start w-full">
      <Link href={user.username} className="flex gap-3 items-center">
        <Avatar className="h-10 w-10">
           <AvatarImage src={user.profile_picture_url || ''} />
          <AvatarFallback>
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
        <p className="font-semibold hover:underline">{user.username}</p>
        {formattedDate && (
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        )}
      </div>
      </Link>

      <div className="flex gap-2">
        {!isFollowing && (
          <Button variant="outline" size="sm" className="gap-1 bg-white/10 rounded-full">
            <UserPlus className="h-4 w-4" />
            Follow
          </Button>
        )}
        <Button variant="ghost" size="sm" className="p-1">
          <Ellipsis className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};