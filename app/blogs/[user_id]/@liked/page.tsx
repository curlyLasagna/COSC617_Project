import { PostCard } from "@/components/post-card";
import { fetchLikedPostsAction } from "@/utils/posts/fetch-liked-posts";

export default async function LikedPosts({
  params,
}: {
  params: { user_id: string };
}) {
  const { user_id } = await params;
  console.log(user_id);
  const { success, error, posts } = await fetchLikedPostsAction(user_id);
  if (!success || !posts) {
    console.log("Error fetching liked posts:", error);
    return <div>Error loading liked posts</div>;
  }
  return (
    <>
      {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-8 w-full">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground text-center">
          <p>No posts yet</p>
        </div>
      )}
    </>
  );
}
