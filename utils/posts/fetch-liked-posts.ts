"use server";
import { createClient } from "../supabase/server";
import { extractPlainText } from "./extract-plain-text";

export async function fetchLikedPostsAction(user_id?: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "User not found", posts: [] };
  const owner_id = user.id;

  const { data: likedPostIds } = await supabase
    .from("likes")
    .select("post_id")
    .eq("owner_id", owner_id);

  if (!likedPostIds || likedPostIds.length === 0) {
    return { success: true, error: "", posts: [] };
  }

  const postIds = likedPostIds.map((like) => like.post_id);

  const { data: likedPosts, error } = await supabase
    .from("posts")
    .select(
      `
          post_id,
          text_body,
          caption,
          media_url,
          post_type,
          title,
          date_created,
          owner_id,
          users:users!posts_user_uuid_fkey(
            user_id,
            username,
            profile_picture_url,
            auth_user_id
          )
        `,
    )
    .in("post_id", postIds)
    .order("date_created", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return { success: false, error, posts: [] };
  }

  const filteredPosts = user_id
    ? likedPosts.filter((post) => post?.owner_id === user_id)
    : likedPosts;

  const posts = filteredPosts.map((post) => {
    const post_user = Array.isArray(post.users) ? post.users[0] : post.users;
    return {
      id: post.post_id,
      users: {
        username: post_user.username || "Anonymous",
        profile_picture_url: post_user.profile_picture_url || null,
      },
      postTime: new Date(post.date_created || new Date()),
      notes: 0,
      isFollowing: user_id ? post_user.auth_user_id !== user_id : false,
      postType: post.post_type as "text" | "photo" | "video" | "link",
      textContent: extractPlainText(post.text_body),
      title: post.title || undefined,
      mediaUrl: post.media_url || undefined,
      caption: extractPlainText(post.caption),
      rawTextBody: post.text_body, // Preserve original for advanced rendering
    };
  });

  return { success: true, error: "", posts };
}
