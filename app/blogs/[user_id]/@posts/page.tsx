import { PostCard } from "@/components/post-card";
import { getPostsAction } from "@/utils/posts/get-posts-action";

export default async function BlogPosts({
  params,
}: {
  params: { user_id: string };
}) {
  const { user_id } = await params;
  const posts = await getPostsAction(user_id);
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
