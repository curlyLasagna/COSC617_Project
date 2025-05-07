import { UIUser, User } from "@/types/user";

// Mock data for users, used to create test-posts and mock-blogs
export const mockUsers: User[] = [
  {
    user_id: 1,
    username: "shit-poster",
    email: "shitposter@example.com",
    profile_picture_url: "https://i.pravatar.cc/150?img=11",
    date_created: new Date(Date.now() - 3600000 * 24 * 30),
    date_updated: new Date(Date.now() - 3600000 * 24 * 7),
    auth_user_id: "1",
  },
  {
    user_id: 2,
    username: "urban-photography",
    email: "photography@example.com",
    profile_picture_url: "https://i.pravatar.cc/150?img=22",
    date_created: new Date(Date.now() - 3600000 * 24 * 90),
    date_updated: new Date(Date.now() - 3600000 * 24 * 14),
    auth_user_id: "2",
  },
  {
    user_id: 3,
    username: "ghibli-dork",
    email: "ghibli@example.com",
    profile_picture_url: "https://i.pravatar.cc/150?img=33",
    date_created: new Date(Date.now() - 3600000 * 24 * 60),
    date_updated: new Date(Date.now() - 3600000 * 24 * 3),
    auth_user_id: "3",
  },
  {
    user_id: 4,
    username: "news-guy",
    email: "news@example.com",
    profile_picture_url: "https://i.pravatar.cc/150?img=55",
    date_created: new Date(Date.now() - 3600000 * 24 * 180),
    date_updated: new Date(Date.now() - 3600000 * 24 * 1),
    auth_user_id: "4",
  },
];
