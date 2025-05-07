"use server";
import { Following, User, uuid } from "@/types/user";
import { createClient } from "./server";

export const listUserInfo = async (user_uuid: uuid) => {
  const supabase = await createClient();
  const { data: users, error }: { data: User | null; error: any } =
    await supabase.from("users").select("*").single();

  return {
    username: users?.username,
    email: users?.email,
    pfp: users?.profile_picture_url,
  };
};

export const listFollowers = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("follow")
    .select("users (username)")
    .eq("followee_id", userId);

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((follower) => follower.users);
};

export const listFollowing = async (): Promise<Following[]> => {
  const supabase = await createClient();
  const { data: userInfo, error: userError } = await supabase.auth.getUser();
  const userId = userInfo.user?.id;
  const { data: userFollowData, error: userFollowError } = (await supabase
    .from("follow")
    .select(
      "followee_id, users:users!followee_id(username, profile_picture_url)",
    )
    .eq("follower_id", userId)) as { data: Following[] | null; error: any };

  if (userFollowError || !userFollowData) {
    console.log(userFollowError);
    return [];
  }

  const followings: Following[] = userFollowData.map((user) => ({
    followee_id: user.followee_id,
    users: {
      username: user.users.username,
      profile_picture_url: user.users.profile_picture_url,
    },
  }));
  return followings;
};

export const followUser = async (
  target_account: Following,
): Promise<string> => {
  const supabase = await createClient();

  // Get the current user's information

  const { data: userInfo, error: userError } = await supabase.auth.getUser();

  // First, check if the follow relationship already exists
  const { data: existing, error: checkError } = await supabase
    .from("follow")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userInfo.user?.id)
    .eq("followee_id", target_account.followee_id);

  if (checkError) {
    console.log(checkError);
    return "Error occurred while checking follow status";
  }

  if (existing && existing.length > 0) {
    return `You are already following ${target_account.user.username}`;
  }

  // Insert the follow relationship
  const { error } = await supabase.from("follow").insert([
    {
      follower_id: userInfo.user?.id,
      followee_id: target_account.followee_id,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.log(error);
    return "Error occurred while following";
  }

  return `You are now following ${target_account.users.username}`;
};
export const unfollowUser = async (
  target_account: Following,
): Promise<string> => {
  const supabase = await createClient();
  const { error, count } = await supabase
    .from("follow")
    .delete()
    .eq("followee_id", target_account.followee_id);

  if (error) {
    console.log(error);
    return "Error occured while unfollowing";
  }

  if (count === 0) {
    return `You have already unfollowed ${target_account.users.username}`;
  }

  return `You've unfollowed ${target_account.users.username}`;
};
