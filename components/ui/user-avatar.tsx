import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Ellipsis } from "lucide-react";

interface UserAvatarProps {
  username: string;
  profilePic: string;
  isFollowing: boolean;
  postTime: Date;
}

export const UserAvatar = ({
  username,
  profilePic,
  isFollowing,
  postTime,
  //user avatar formatting
}: UserAvatarProps) => {
  const formattedDate = postTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return (
    <div className="flex justify-between items-start w-full">
      <div className="flex gap-3 items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={profilePic} alt={username} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {!isFollowing && (
          <Button variant="outline" size="sm" className="gap-1 bg-white/10">
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