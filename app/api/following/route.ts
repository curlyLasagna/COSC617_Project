import { listFollowing } from "@/utils/supabase/users";
import { NextResponse } from "next/server";

export async function GET() {
  const following = await listFollowing();
  return NextResponse.json(following);
}
