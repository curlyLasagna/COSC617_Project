import { unfollowUser } from "@/utils/supabase/users";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { uuid } = await req.json();
  const res = await unfollowUser(uuid);
  return NextResponse.json({ message: res });
}
