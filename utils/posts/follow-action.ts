"use server";
import { createClient } from "../supabase/server";
export default async function follow(followee_id: number) {
	const supabase = await createClient();
	let { data: follower_id, error: user_err } = await supabase.rpc(
		"fetch_current_user_id",
	);
	if (user_err) console.error(user_err);

	const { data, error: follow_err } = await supabase
		.from("follow")
		.insert([{ follower_id, followee_id }])
		.select();

	if (follow_err) console.error(follow_err);
}
