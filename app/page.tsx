import { PostCard } from "@/components/post-card";
import { testPosts } from "@/data/test-post";

// populate landing page w/ posts
export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
      <div className="flex flex-col gap-8 w-full">
          {testPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
