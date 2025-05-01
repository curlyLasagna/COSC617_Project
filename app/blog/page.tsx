"use client";
// app/blog/[username]/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useMemo, useState } from "react";
import { createEditor } from "slate";
import { BaseEditor, Descendant, Editor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

type CustomElement = { type: "paragraph"; children: { text: string }[] };

interface Props {
  params: {
    username: string;
  };
}

export default async function BlogPage({ params }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const username = params.username;

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<CustomElement[]>([
    {
      type: "paragraph",
      children: [{ text: "Start writing your post here..." }],
    },
  ]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{username}'s Blog</h1>
      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border rounded p-4">
              <h2 className="font-semibold">{post.title || "Untitled Post"}</h2>
              <p>{post.content || "No content provided."}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground text-center">
          <p>No posts yet. Create one to get started!</p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-semibold">Create a New Text Post</h2>
        <div className="border rounded p-4">
          <Slate
            editor={editor}
            initialValue={value}
            onChange={(newValue) => setValue(newValue as CustomElement[])}
          >
            <Editable className="min-h-[150px] p-2 border rounded" />
          </Slate>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Post
        </button>
      </div>

      {/* map through user posts and render PostCard components here */}
    </main>
  );
}
