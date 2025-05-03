"use server";
import { Following } from "@/types/user";
import { createClient } from "./server";

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
  const { data: user, error: user_error } = await supabase.auth.getUser();
  const userId = user.user?.id;
  const { data, error } = await supabase
    .from("follow")
    .select("followee_id, users:users!followee_id(username)")
    .eq("follower_id", userId);

  if (error || !data) {
    console.log(user_error);
    return [];
  }

  return data.map((row) => ({
    followee_id: row.followee_id,
    username: row.users.username,
  }));
};
