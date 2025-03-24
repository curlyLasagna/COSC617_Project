import { mockPosts } from "@/data/test-post";
import { PostCard } from "@/components/post-card";

export function Feed() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}