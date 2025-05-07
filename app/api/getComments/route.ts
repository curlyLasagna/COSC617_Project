import { getComment } from "@/utils/posts/comment-action";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  const comments = await getComment(postId || "");
  return NextResponse.json(comments);
}
