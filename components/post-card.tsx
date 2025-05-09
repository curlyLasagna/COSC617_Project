"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { CommentList } from "./ui/comment-list";
import { PostActions } from "./ui/post-actions";
import { UserAvatar } from "./ui/user-avatar";

export interface Post {
  id: number;
  users: {
    username: string;
    profile_picture_url: string | null;
  };
  postTime: Date;
  notes: number;
  isFollowing: boolean;

  postType: "text" | "photo" | "video" | "link";
  textContent?: string;
  title?: string;
  mediaUrl?: string;
  caption?: string;
  rawTextBody?: string;
}
interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const renderPostContent = () => {
    switch (post.postType) {
      //photo posts
      case "photo":
        return (
          <div className="space-y-2">
            <img
              src={post.mediaUrl}
              alt={post.caption || ""}
              className="w-full max-h-[500px] object-cover"
            />
            {post.caption && (
              <p className="text-m px-4 py-2 whitespace-pre-line">
                {post.caption}
              </p>
            )}
          </div>
        );
      // video posts
      case "video":
        return (
          <div className="space-y-4">
            {post.textContent && (
              <p className="whitespace-pre-line">{post.textContent}</p>
            )}
            <video controls className="w-full">
              <source src={post.mediaUrl} />
            </video>
            {post.caption && (
              <p className="text-m px-4 whitespace-pre-line">{post.caption}</p>
            )}
          </div>
        );
      //link posts
      case "link":
        return (
          <div className="px-4 space-y-3">
            {/* Render caption above the link if it exists */}
            {post.caption && (
              <p className="text-m whitespace-pre-line mb-2">{post.caption}</p>
            )}
            {/* Link preview */}
            <a
              href={post.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 border rounded-lg hover:bg-accent"
            >
              <Link className="h-4 w-4" />
              <span className="truncate">{post.title || post.mediaUrl}</span>
            </a>
          </div>
        );
      //text posts
      default: // text
        return (
          <div className="space-y-2">
            {post.title && (
              <h3 className="text-xl font-bold tracking-tight px-4">
                {post.title}
              </h3>
            )}
            <p className="px-4">{post.textContent}</p>
          </div>
        );
    }
  };
  //card formatting
  return (
    <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-sm">
      <CardHeader className="px-4 pb-2 pt-4">
        <UserAvatar
          user={{
            username: post.users.username,
            profile_picture_url: "",
          }}
          isFollowing={post.isFollowing}
          postTime={post.postTime}
        />
      </CardHeader>

      <CardContent className="px-0 pt-2">{renderPostContent()}</CardContent>

      <div className="border-t border-neutral-400 dark:border-neutral-700 mx-4 my-0" />

      <CardFooter className="px-4 pb-2 pt-2 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full px-3 py-1 h-auto border-neutral-400"
        >
          <span className="font-bold mr-1">{post.notes}</span> notes
        </Button>
        <PostActions postId={post.id} />
      </CardFooter>

      <div className="border-t border-neutral-400 dark:border-neutral-700" />

      <CommentList postId={post.id.toString()} />
    </Card>
  );
};
