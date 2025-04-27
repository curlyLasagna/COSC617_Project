"use server";
import { createClient } from "../supabase/server";

export default async function likeAction(postId: number) {
	const supabase = await createClient();
	let { data: user_id, error: user_err } = await supabase.rpc(
		"fetch_current_user_id",
	);

	if (user_err) console.error(user_err);

	const { data, error } = await supabase
		.from("likes")
		.insert([{ user_id, post_id: postId }])
		.select();

	if (error) console.error(error);
}
