"use client";
import { Following } from "@/types/user";
import { listFollowing } from "@/utils/supabase/users";
import { useEffect, useState } from "react";
export default function FollowingPage() {
  const [following, setFollowing] = useState<Following[]>([]);
  useEffect(() => {
    (async () => {
      setFollowing(await listFollowing());
    })();
  }, []);
  return (
    <div>
      {following.map((e) => (
        <p key={e.followee_id}>{e.username}</p>
      ))}
    </div>
  );
}
