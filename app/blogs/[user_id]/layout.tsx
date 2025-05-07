"use client";
import { Search } from "lucide-react";
import { ReactNode, useState } from "react";

export default function RootLayout({
  children,
  blog,
  posts,
  liked,
}: {
  children: ReactNode;
  blog: ReactNode;
  posts: ReactNode;
  liked: ReactNode;
}) {
  const [isPost, setIsPost] = useState(true);
  return (
    <main className="p-4">
      {children}
      {blog}

      <div className="flex items-center justify-start gap-5">
        <Search />

        <button
          className={`font-bold ${isPost ? "border-b-2 border-foreground" : ""} `}
          onClick={() => setIsPost(true)}
        >
          Posts
        </button>
        <button
          className={`font-bold ${isPost ? "" : "border-b-2 border-foreground"} `}
          onClick={() => setIsPost(false)}
        >
          Liked
        </button>
      </div>
      <hr className="block border-1 w-full my-4" />
      {isPost ? posts : liked}
    </main>
  );
}
