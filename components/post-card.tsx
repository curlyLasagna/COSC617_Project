import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { UserAvatar } from "./ui/user-avatar";
import { PostActions } from "./ui/post-actions";
import { Link} from "lucide-react";

export interface Post {
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
}
interface PostCardProps{
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const renderPostContent = () => {
    switch (post.postType) {
      case 'photo':
        return (
          <div className="space-y-2">
            <img 
              src={post.mediaUrl} 
              alt={post.caption || ''}
              className="w-full max-h-[500px] object-cover"
            />
            {post.caption && <p className="text-m px-4 py-2">{post.caption}</p>}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            {post.textContent && <p>{post.textContent}</p>}
            <video controls className="w-full">
              <source src={post.mediaUrl} />
            </video>
            {post.caption && <p className="text-m px-4">{post.caption}</p>}
          </div>
        );

      case 'link':
        return (
          <div className="px-4">
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
            {post.title && (
              <h3 className="text-xl font-bold tracking-tight px-4">
                {post.title}
                </h3>)}
            <p className ="px-4">
            {post.textContent}</p>
          </div>
        );
    }
  };
  return (
    <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-sm">
      <CardHeader className="px-4 pb-2 pt-4">
        <UserAvatar
          username={post.username}
          profilePic={post.profilePic}
          isFollowing={post.isFollowing}
          postTime={post.postTime}
        />
      </CardHeader>

      <CardContent className="px-0 pt-2">
        {renderPostContent()}
      </CardContent>

      <div className="border-t border-neutral-400 dark:border-neutral-700 mx-4 my-0" />

      <CardFooter className="px-4 pb-2 pt-2 flex justify-between items-center">
        <span className="text-m border border-neutral-400 rounded-full px-3 py-1">
        <span className="font-bold">
          {post.notes}</span> notes
        </span>
        <PostActions />
      </CardFooter>
    </Card>
  );
};