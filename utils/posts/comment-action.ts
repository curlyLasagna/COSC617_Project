"use server";
import { createClient } from "../supabase/server";

export default async function commentOnPost(
  post_id: number,
  content: string,
  parent_comment_id?: number,
) {
  const supabase = await createClient();
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);

    if (!session) throw new Error("Session is absent, can't get user's id");
    const owner_id = session.user.id;

    const { data, error: comment_err } = await supabase
      .from("comments")
      .insert([{ post_id, content, owner_id, parent_id: parent_comment_id }])
      .select();

    if (comment_err) throw new Error(comment_err.message);
    return {
      succuess: true,
      message: "Comment was successfuly created",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
