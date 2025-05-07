// app/followers/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type FollowerUser = {
  username: string;
  full_name?: string;
  avatar_url?: string;
};

type FollowerEntry = {
  follower_id: string;
  follower: FollowerUser | null;
};

export default async function FollowersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data, error } = await supabase
    .from("follow")
    .select(
      "follower_id, follower:users!follow_folower_id_fkey ( username, profile_picture_url )",
    )
    .eq("followee_id", user.id);

  const followersData = (data || []).map((entry: any) => ({
    follower_id: entry.follower_id,
    follower: entry.follower,
  }));

  if (error) {
    console.error("Error fetching followers:", error.message);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Followers</h1>
        <p className="text-red-500 mt-4">Failed to load followers.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Followers</h1>
      {followersData.length === 0 ? (
        <p className="text-muted-foreground mt-4">You have no followers yet.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {followersData.map(({ follower_id, follower }) => (
            <li
              key={follower_id}
              className="border rounded p-4 flex items-center gap-3"
            >
              {!!follower && follower.profile_picture_url && (
                <img
                  src={follower.profile_picture_url}
                  alt={follower.username}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold">{follower?.username}</p>
                <p className="text-sm text-muted-foreground">
                  @{follower?.username}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
