// app/likes/page.tsx
import { PostCard } from "@/components/post-card";
import { fetchLikedPostsAction } from "@/utils/posts/fetch-liked-posts";
export default async function LikesPage() {
  const { success, error, posts } = await fetchLikedPostsAction();
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No post has been liked yet.
      </p>
    );
  }

  if (!success) {
    return <p className="text-center text-muted-foreground">{String(error)}</p>;
  }

  return (
    <div className="flex flex-col gap-8 w-full p-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
