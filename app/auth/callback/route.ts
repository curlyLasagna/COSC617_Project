import { generate_avatar } from "@/lib/avatar-generate";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();
  const sb = await createClient();
  if (code) {
    const { data: sessionData, error: sessionError } =
      await sb.auth.exchangeCodeForSession(code);
    const user = sessionData.user;
    const { data: userData, error: userError } = await sb
      .from("users")
      .select("profile_picture_url, auth_user_id")
      .eq("auth_user_id", user?.id)
      .single();

    // If user doesn't have a default avatar
    if (!userData?.profile_picture_url) {
      console.log("User doesn't have an avatar");
      const avatarSVG = generate_avatar();
      const avatarFileName = `${userData?.auth_user_id}.svg`;
      const { data: uploadData, error: uploadError } = await sb.storage
        .from("pfp")
        .upload(avatarFileName, avatarSVG, {
          contentType: "image/svg+xml",
          upsert: true,
        });

      if (uploadError) {
        console.error("RIP", uploadError);
      } else {
        const avatarURL = sb.storage.from("pfp").getPublicUrl(avatarFileName);
        await sb
          .from("users")
          .update({ profile_picture_url: avatarURL })
          .eq("auth_user_id", user?.id);
      }
    }
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/protected`);
}
