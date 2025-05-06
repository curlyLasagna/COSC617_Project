// app/likes/page.tsx
import { PostCard } from "@/components/post-card";
import { extractPlainText } from "@/utils/posts/extract-plain-text";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function LikesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: likedPostIds } = await supabase
    .from("likes")
    .select("post_id")
    .eq("owner_id", user.id);

  if (!likedPostIds || likedPostIds.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No liked posts available.
      </p>
    );
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
    return [];
  }
  const posts = likedPosts.map((post) => ({
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

  return (
    <div className="flex flex-col gap-8 w-full p-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
