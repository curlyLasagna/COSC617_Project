import { PostCard } from "@/components/post-card";
import { testPosts } from "@/data/test-post";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-6 px-4">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold">Welcome to Fumblr</h1>

      {/* Post Feed */}
      <div className="flex flex-col gap-8 w-full">
        {testPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}