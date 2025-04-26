"use server";
import { createClient } from "../supabase/server";

export default async function commentOnPost(
	post_id: number,
	content: string,
	parent_comment_id?: number,
) {
	const supabase = await createClient();
	let { data: user_id, error: user_err } = await supabase.rpc(
		"fetch_current_user_id",
	);
	if (user_err) console.error(user_err);

	const { data, error: comment_err } = await supabase
		.from("comments")
		.insert([{ post_id, content, user_id, parent_id: parent_comment_id }])
		.select();

	if (comment_err) console.error(comment_err);
}
