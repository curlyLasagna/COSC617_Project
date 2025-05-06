// app/likes/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function LikesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: likedPostIds } = await supabase
    .from("likes")
    .select("post_id")
    .eq("auth_user_id", user.id);

  if (!likedPostIds || likedPostIds.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No liked posts available.
      </p>
    );
  }

  const postIds = likedPostIds.map((like) => like.post_id);

  const { data: likedPosts } = await supabase
    .from("posts")
    .select("*")
    .in("id", postIds);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Liked Posts</h1>
      <div className="space-y-4 mt-4">
        {likedPosts?.map((post) => (
          <div key={post.id} className="border rounded p-4">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
