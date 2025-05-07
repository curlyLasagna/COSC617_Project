"use server";
import { createClient } from "../supabase/server";

export default async function likeAction(postId: number) {
  const supabase = await createClient();
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw new Error(error.message);

    if (!session) throw new Error("Session is absent, can't get user's id");
    const user_id = session.user.id;

    const { data, error: like_err } = await supabase
      .from("likes")
      .insert([{ owner_id: user_id, post_id: postId }])
      .select();

    if (like_err) throw new Error(like_err.message);

    return {
      success: true,
      message: "Successfuly liked",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
