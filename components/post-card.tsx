import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { UserAvatar } from "./ui/user-avatar";
import { PostActions } from "./ui/post-actions";
import { Link} from "lucide-react";

interface PostCardProps {
  post: {
    id: string;
    username: string;
    profilePic: string;
    postTime: Date;
    content: string;
    notes: number;
    isFollowing: boolean;

    postType: 'text' | 'photo' | 'video' | 'link';
    textContent?: string;        
    title?: string;             
    mediaUrl?: string;          
    caption?: string;  
    
    // for video posts
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  const renderPostContent = () => {
    switch (post.postType) {
      case 'photo':
        return (
          <div className="space-y-2">
            {post.textContent && <p>{post.textContent}</p>}
            <img 
              src={post.mediaUrl} 
              alt={post.caption || ''}
              className="rounded-lg w-full max-h-[500px] object-cover"
            />
            {post.caption && <p className="text-sm text-muted-foreground">{post.caption}</p>}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-2">
            {post.textContent && <p>{post.textContent}</p>}
            <video controls className="rounded-lg w-full">
              <source src={post.mediaUrl} />
            </video>
            {post.caption && <p className="text-sm text-muted-foreground">{post.caption}</p>}
          </div>
        );

      case 'link':
        return (
          <div className="space-y-2">
            {post.textContent && <p>{post.textContent}</p>}
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

      default: // text
        return (
          <div className="space-y-2">
            {post.title && <h3 className="font-bold">{post.title}</h3>}
            <p>{post.textContent}</p>
          </div>
        );
    }
  };
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
        {renderPostContent()}
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