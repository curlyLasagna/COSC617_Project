import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { UserAvatar } from "./ui/user-avatar";
import { PostActions } from "./ui/post-actions";

interface PostCardProps {
  post: {
    id: string;
    username: string;
    profilePic: string;
    postTime: Date;
    content: string;
    notes: number;
    isFollowing: boolean;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="p-4">
        <UserAvatar
          username={post.username}
          profilePic={post.profilePic}
          isFollowing={post.isFollowing}
          postTime={post.postTime}
        />
      </CardHeader>

      <CardContent className="p-4">
        <p>{post.content}</p>
      </CardContent>

      <div className="border-t mx-4" />

      <CardFooter className="p-4 flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {post.notes} notes
        </span>
        <PostActions />
      </CardFooter>
    </Card>
  );
};