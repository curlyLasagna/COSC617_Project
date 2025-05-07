"use server";

import { Post } from "@/components/post-card";
import { createClient } from "@/utils/supabase/server";

// Helper function to extract plain text from rich text JSON
function extractPlainText(richText?: string | null): string | undefined {
  if (!richText) return undefined;

  try {
    const content = JSON.parse(richText);
    if (Array.isArray(content)) {
      return content
        .map((block) => {
          if (block.type === "paragraph" && block.children) {
            return block.children.map((child: any) => child.text).join("");
          }
          return "";
        })
        .filter(Boolean) // Remove empty strings
        .join("\n\n"); // Double newline between paragraphs
    }
  } catch {
    return richText; // Fallback for invalid JSON
  }
  try {
    const content = JSON.parse(richText);
    if (Array.isArray(content)) {
      return content
        .map((block) => {
          if (block.type === "paragraph" && block.children) {
            return block.children.map((child: any) => child.text).join("");
          }
          return "";
        })
        .filter(Boolean) // Remove empty strings
        .join("\n\n"); // Double newline between paragraphs
    }
    return richText; // Fallback for non-array JSON
  } catch {
    return richText; // Fallback for invalid JSON
  }
}

export const getPostsAction = async (user_id?: string): Promise<Post[]> => {
  const supabase = await createClient();
  let userId = user_id;
  if (!user_id) {
    const { data } = await supabase.auth.getUser();
    userId = data.user?.id;
  }

  const { data: posts, error } = await supabase
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
        username,
        profile_picture_url,
        auth_user_id
      )
    `,
    )
    .order("date_created", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  let filtered_post = posts;

  if (user_id) {
    filtered_post = posts.filter((post) => {
      post.users[0]?.auth_user_id === user_id;
    });
  }

  const resolvedPosts = await Promise.all(
    filtered_post.map(async (post) => {
      const user = Array.isArray(post.users) ? post.users[0] : post.users;
      return {
        id: post.post_id,
        users: {
          username: user.username || "Anonymous",
          profile_picture_url: user.profile_picture_url || null,
        },
        postTime: new Date(post.date_created || new Date()),
        notes: 0,
        isFollowing: user?.auth_user_id
          ? user?.auth_user_id !== user.auth_user_id
          : false,
        postType: post.post_type as "text" | "photo" | "video" | "link",
        textContent: extractPlainText(post.text_body),
        title: post.title || undefined,
        mediaUrl: post.media_url,
        caption: extractPlainText(post.caption),
        rawTextBody: post.text_body,
      };
    }),
  );

  return resolvedPosts;
};
