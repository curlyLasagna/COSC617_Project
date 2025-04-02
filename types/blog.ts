export interface Blog {
  blog_id: number;
  owner_id: number;  // References user_id
  handle: string;    // URL-friendly identifier
  title: string;
  description: string | null;
  theme: string;
  banner_url: string | null;
  created_at: Date;
  updated_at: Date;
}

// For UI display
export interface UIBlog extends Omit<Blog, 'owner_id'> {
  owner: {
    username: string;
    avatar_url: string;
  };
  isFollowing: boolean;
}