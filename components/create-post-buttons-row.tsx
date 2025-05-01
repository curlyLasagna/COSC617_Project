"use client";
import { PostTypeButtons } from "./post-type-buttons";

interface CreatePostButtonsRowProps {
  user?: any;
}

export function CreatePostButtonsRow({ user }: CreatePostButtonsRowProps) {
  if (!user) return null;

  const handleSelect = (type: string) => {
    console.log(`Creating ${type} post`);
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg"> {/* Added rounded-lg */}
      <div className="max-w-2xl mx-auto p-4">
        <PostTypeButtons 
          onSelect={handleSelect}
          className="justify-center gap-10"
        />
      </div>
    </div>
  );
}