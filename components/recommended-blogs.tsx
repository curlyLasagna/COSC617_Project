import { Button } from "@/components/ui/button";
// This component displays a list of recommended blogs with their avatars and follow buttons
// components/recommended-blogs.tsx
import { UIBlog } from "@/types/blog";

interface RecommendedBlogsProps {
  blogs: UIBlog[];
}

export const RecommendedBlogs = ({ blogs }: RecommendedBlogsProps) => {
  return (
    <div className="px-4 py-3">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Check out these blogs
      </h3>
      <div className="space-y-1">
        {blogs.map((blog) => (
          <div
            key={blog.blog_id}
            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Profile Pic*/}
              <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={blog.owner.avatar_url}
                  alt={`${blog.handle_url} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Username and Blog Title */}
              <div className="min-w-0">
                <p className="text-m font-bold text-gray-900 dark:text-gray-100 truncate">
                  {blog.owner.username}
                </p>
                <p className="text-m text-gray-600 dark:text-gray-400 truncate">
                  {blog.title}
                </p>
              </div>
            </div>

            {/* Follow Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-m h-7 px-0 text-blue-600 dark:text-blue-400 hover:underline hover:bg-transparent"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
