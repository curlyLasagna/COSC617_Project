// data/mock-posts.ts
export interface MockPost {
    id: string;
    username: string;
    profilePic: string;
    postTime: Date;
    content: string;
    image?: string; // Optional image URL
    notes: number;
    isFollowing: boolean;
  }
  
  export const mockPosts: MockPost[] = [
    {
      id: "post-1",
      username: "cyberpunk-artist",
      profilePic: "https://i.pravatar.cc/150?img=11",
      postTime: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      content: "Just finished this neon cityscape. The vibes are immaculate. 🏙️✨",
      image: "https://source.unsplash.com/random/600x400/?cyberpunk",
      notes: 142,
      isFollowing: false,
    },
    {
      id: "post-2",
      username: "coffee-philosopher",
      profilePic: "https://i.pravatar.cc/150?img=5",
      postTime: new Date(Date.now() - 3600000 * 5), // 5 hours ago
      content: "Why do we say 'tumblelog' when we could say 'digital scrapbook'?",
      notes: 89,
      isFollowing: false,
    },
    {
      id: "post-3",
      username: "vintage-camera-goblin",
      profilePic: "https://i.pravatar.cc/150?img=8",
      postTime: new Date(Date.now() - 86400000), // 1 day ago
      content: "Found this beauty at a flea market today. Fully functional!",
      image: "https://source.unsplash.com/random/600x400/?camera",
      notes: 256,
      isFollowing: false,
    },
  ];