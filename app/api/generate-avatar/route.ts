import { generate_avatar } from "@/lib/avatar-generate";
import { NextResponse } from "next/server";

export async function GET() {
  const avatarSvg = generate_avatar();
  return NextResponse.json({ avatar: avatarSvg });
}
