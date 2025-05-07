import { CreatePostButtonsRow } from "@/components/post-creation/create-post-buttons-row";
import { createClient } from "@/utils/supabase/server";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-1 flex flex-col gap-6 px-4">
      {/* Only shows for logged-in users */}
      {user && <CreatePostButtonsRow user={user} />}

      {/* Post Feed - shows for everyone */}
      <div className="flex flex-col gap-8 w-full">{children}</div>
    </div>
  );
}
