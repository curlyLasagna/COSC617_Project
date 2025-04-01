export interface User {
    user_id: number;
    username: string;
    email: string;
    profile_picture_url: string | null;
    date_created: Date;
    date_updated: Date;
  }
  
  export interface UIUser {
    user_id: number;
    username: string;
    display_name: string;
    profile_picture_url: string | null;
    profile_url: string;  // Computed: `/username`
    bio?: string;
  }