import { User } from "@/types/user";
import { createClient } from "../supabase/server";

export async function fecthUser(user_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select(`*`)
    .eq("auth_user_id", user_id)
    .single();

  if (error) {
    return { success: false, error: error.message, user: null };
  }

  return {
    success: true,
    error: "",
    user: data as User,
  };
}
