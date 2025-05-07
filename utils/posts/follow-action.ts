"use server";
import { createClient } from "../supabase/server";
export default async function follow(followee_id: string) {
  const supabase = await createClient();
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    if (!user) throw new Error("Not authenicate");
    const follower_id = user.id;

    const { data, error: follow_err } = await supabase
      .from("follow")
      .insert([{ follower_id, followee_id }])
      .select();

    if (follow_err) throw new Error(follow_err.message);

    return {
      success: true,
      message: "Successfuly followed",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
