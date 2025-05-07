export interface Blog {
  blog_id: number;
  owner_id: string; // References user_id
  handle_url: string; // URL-friendly identifier
  title: string;
  bio: string | null;
  theme: string;
  banner_url: string | null;
  created_at: Date;
  updated_at: Date;
}

// For UI display
export interface UIBlog extends Omit<Blog, "owner_id"> {
  owner: {
    username: string;
    avatar_url: string;
  };
  isFollowing: boolean;
}
