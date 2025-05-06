// app/actions/posts.ts
"use server";

import { randomUUID } from "crypto";
import { Post } from "@/components/post-card";
import { createClient } from "@/utils/supabase/server";

export const createPostAction = async (formData: FormData) => {
  // Initialize Supabase client
  const supabase = await createClient(); // Make sure to await the client creation

  // Get current user session
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Authentication error:", authError);
    return {
      success: false,
      message: "You must be logged in to create a post",
    };
  }

  // Get user profile data
  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select("user_id, username, profile_picture_url")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError || !userProfile) {
    console.error("Profile error:", profileError);
    return {
      success: false,
      message: "Failed to fetch user profile",
    };
  }

  // Extract post data from form
  const postType = formData.get("postType")?.toString();
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  //   const mediaUrl = formData.get("mediaUrl")?.toString();
  const caption = formData.get("caption")?.toString();
  const file = formData.get("file") as File;

  console.log("File:", file.size, file.type, file.name);

  // Validate required fields
  if (!postType) {
    return {
      success: false,
      message: "Post type is required",
    };
  }

  const { data, error: storage_err } = await supabase.storage
    .from("media")
    .upload(`${user.id}/${randomUUID()}`, file, {
      contentType: file.type,
    });

  if (storage_err) {
    return {
      success: false,
      message: "Storate error: " + storage_err.message,
    };
  }

  if (!data) {
    return {
      success: false,
      message: "Failed to upload file",
    };
  }

  // Prepare post data for Supabase
  const postInsert = {
    owner_id: user.id,
    user_id: userProfile.user_id,
    text_body: content,
    caption: caption,
    media_url: data.path,
    post_type: postType,
    title: title,
  };

  // Insert into database
  const { data: insertedPost, error } = await supabase
    .from("posts")
    .insert(postInsert)
    .select()
    .single();

  if (error || !insertedPost) {
    console.error("Insert error:", error);
    return {
      success: false,
      message: "Failed to create post",
    };
  }

  // Format the response for PostCard component
  const formattedPost: Post = {
    id: insertedPost.post_id,
    username: userProfile.username || "Anonymous",
    profilePic: userProfile.profile_picture_url || null,
    postTime: new Date(insertedPost.date_created || new Date()),
    notes: 0,
    isFollowing: false,
    postType: postType as "text" | "photo" | "video" | "link",
    textContent: insertedPost.text_body || undefined,
    title: insertedPost.title || undefined,
    mediaUrl: insertedPost.media_url || undefined,
    caption: insertedPost.caption || undefined,
  };

  return {
    success: true,
    message: "Post created successfully!",
    post: formattedPost,
  };
};
