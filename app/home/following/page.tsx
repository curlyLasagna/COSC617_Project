"use client";
import FollowingTable from "@/components/following/following-list";
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
      <FollowingTable arr={following} />
    </div>
  );
}
