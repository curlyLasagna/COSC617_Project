"use client";
import { Blog } from "@/types/blog";
import { User } from "@/types/user";
import follow from "@/utils/posts/follow-action";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

export function BlogComponent({ blog, user }: { blog: Blog; user: User }) {
  const avatarDimension = 16;
  return (
    <>
      <Card className="flex flex-col gap-4 mx-auto shadow-md rounded-lg itesm-center justify-center min-w-[30rem] mb-3 max-w-full">
        <CardHeader className="flex flex-col items-center justify-center p-0 gap-0">
          <img
            src={blog.banner_url || ""}
            alt="Blog Banner"
            className="w-full rounded-md shadow-md object-cover p-0 m-0  h-[30rem]"
          />
          <div
            className={`relative bottom-10 z-10 h-${avatarDimension / 2} w-${avatarDimension}`}
          >
            <img
              src={user.profile_picture_url || ""}
              alt="User Avatar"
              className={`h-${avatarDimension} w-${avatarDimension} rounded-md shadow-md object-cover p-0 m-0 `}
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-3">
          <div className="text-2xl font-bold">{blog.title}</div>
          <div>{blog.bio}</div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => follow(user.auth_user_id)}
            className="bg-accent hover:bg-white/5 border-none hover:text-accent-foreground font-semibold rounded-full w-20 transition-colors"
          >
            Follow
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
