"use client";
import { Comment, getComment } from "@/utils/posts/comment-action";
import { useEffect, useState } from "react";
import { CommentItem } from "./comment-item";
import { Table, TableBody, TableCell, TableRow } from "./table";

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const data = await getComment(postId);
      setComments(data || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Loading comments...
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No comments yet
      </div>
    );
  }

  return (
    <Table>
      <TableBody>
        {comments.map((comment, index) => (
          <TableRow key={index}>
            <TableCell>
              <CommentItem
                content={comment.content}
                user={
                  Array.isArray(comment.users)
                    ? comment.users[0]
                    : comment.users
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
