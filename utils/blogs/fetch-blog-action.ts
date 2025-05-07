"use server";
import { Blog } from "@/types/blog";
import { createClient } from "../supabase/server";

export async function fetchBlogAction(user_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("owner_id", user_id)
    .single();

  if (error) {
    console.log("Error fetching blog:", error);
    return { success: false, error: error.message, blog: null };
  }

  const blog = data as Blog;

  return {
    success: true,
    error: "",
    blog,
  };
}
