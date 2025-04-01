import { mockUsers } from "./mock-users";
import { Blog, UIBlog } from "@/types/blog";
// This file contains mock data for blogs, including raw and UI-ready formats.
// mockBlogs created using mockUsers

// Raw database-like blogs
export const mockBlogs: Blog[] = [
  {
    blog_id: 1,
    owner_id: mockUsers[0].user_id, 
    handle: "musket-memes",
    title: "Founding Father Memes",
    description: "Historical shitposting since 1776",
    theme: "patriotic",
    banner_url: "/banners/muskets.jpg",
    created_at: new Date(Date.now() - 86400000 * 30),
    updated_at: new Date(Date.now() - 86400000 * 7)   
  },
  {
    blog_id: 2,
    owner_id: mockUsers[1].user_id, 
    handle: "cityscapes",
    title: "Urban Explorations",
    description: "Capturing city lights and shadows",
    theme: "monochrome",
    banner_url: "/banners/skyline.jpg",
    created_at: new Date(Date.now() - 86400000 * 90), 
    updated_at: new Date(Date.now() - 86400000 * 3)   
  },
  {
    blog_id: 3,
    owner_id: mockUsers[2].user_id, 
    handle: "ghibli-fanart",
    title: "Studio Ghibli Fanclub",
    description: "Totoro 4ever",
    theme: "whimsical",
    banner_url: "/banners/ghibli.jpg",
    created_at: new Date(Date.now() - 86400000 * 60), 
    updated_at: new Date(Date.now() - 86400000 * 1)   
  }
];

// UI-ready blogs with owner data
export const uiBlogs: UIBlog[] = mockBlogs.map(blog => {
  const owner = mockUsers.find(u => u.user_id === blog.owner_id)!;
  
  return {
    ...blog,
    owner: {
      username: owner.username,
      avatar_url: owner.profile_picture_url || ""
    },
    isFollowing: false
  };
});