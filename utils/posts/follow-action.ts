"use server";
import { createClient } from "../supabase/server";
export default async function follow(followee_id: number) {
  const supabase = await createClient();
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw new Error(error.message);

    if (!session) throw new Error("Session is absent, can't get user's id");
    const follower_id = session.user.id;

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
