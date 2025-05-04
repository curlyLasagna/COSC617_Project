import { Following, uuid } from "@/types/user";
import { unfollowUser } from "@/utils/supabase/users";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface FollowingUserProps {
  uuid: uuid;
  username: string;
  pfp: string;
}

export default function FollowingItem({
  username,
  uuid,
  // pfp,
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src="https://lnfyusmlxilqhmtlyulr.supabase.co/storage/v1/object/public/pfp//1bf80bf9-1302-48c1-8c53-67dcac7f1821.jpeg"
            alt={username}
          />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{username}</p>
        </div>
      </div>
      <Button
        variant="link"
        className="text-primary text-sm px-0"
        onClick={async () =>
          await unfollowUser({
            followee_id: uuid,
            username: username,
          } as Following)
        }
      >
        Unfollow
      </Button>
    </div>
  );
}
