import { BlogComponent } from "@/components/blog/blog";
import { fetchBlogAction } from "@/utils/blogs/fetch-blog-action";
import { fecthUser } from "@/utils/users/fetch-user-action";

export default async function BlogPage({
  params,
}: {
  params: { user_id: string };
}) {
  const { user_id } = await params;
  const { success, error, user } = await fecthUser(user_id);

  if (!success || !user) {
    console.error("Error fetching user:", error);
    return <div>Error loading user data</div>;
  }

  if (error) {
    console.error("Error fetching user:", error);
    return <div>Error loading user data</div>;
  }

  const {
    success: blog_success,
    error: blog_err,
    blog,
  } = await fetchBlogAction(user_id);

  if (!blog_success || !blog) {
    console.log("Error fetching blog:", blog_err);
    return <div>Error loading blog data</div>;
  }

  return <BlogComponent blog={blog} user={user} />;
}
