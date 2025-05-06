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
    return richText; // Fallback for non-array JSON
  } catch {
    return richText; // Fallback for invalid JSON
  }
}

export const getPostsAction = async (): Promise<Post[]> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
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
    `)
    .order("date_created", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return posts.map((post) => ({
    id: post.post_id,
    username: post.users?.username || "Anonymous",
    profilePic: post.users?.profile_picture_url || null,
    postTime: new Date(post.date_created || new Date()),
    notes: 0,
    isFollowing: user?.id ? post.users?.auth_user_id !== user.id : false,
    postType: post.post_type as "text" | "photo" | "video" | "link",
    textContent: extractPlainText(post.text_body),
    title: post.title || undefined,
    mediaUrl: post.media_url || undefined,
    caption: extractPlainText(post.caption),
    rawTextBody: post.text_body, // Preserve original for advanced rendering
  }));
};
