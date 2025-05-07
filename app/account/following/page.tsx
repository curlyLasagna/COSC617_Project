"use client";
import FollowingTable from "@/components/following/following-list";
import { Following } from "@/types/user";
import { listFollowing, unfollowUser } from "@/utils/supabase/users";
import { useEffect, useState } from "react";
export default function FollowingPage() {
  const [following, setFollowing] = useState<Following[]>([]);
  useEffect(() => {
    (async () => {
      setFollowing(await listFollowing());
    })();
  }, []);
  const handleUnfollow = async (unfollowedId: string) => {
    const userToUnfollow = following.find(
      (f) => f.followee_id === unfollowedId,
    );
    if (!userToUnfollow) return;

    await unfollowUser({
      followee_id: unfollowedId,
      users: userToUnfollow.users,
    } as Following);
    // Update local state by filtering out the unfollowed user
    setFollowing((current) =>
      current.filter((follow) => follow.followee_id !== unfollowedId),
    );
  };
  return (
    <div>
      <FollowingTable arr={following} onUnfollow={handleUnfollow} />
    </div>
  );
}
