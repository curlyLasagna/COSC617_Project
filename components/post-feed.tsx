"use client";

import { PostCard } from "@/components/post-card";
import { Post } from "@/components/post-card";
import { getPostsAction } from "@/utils/posts/get-posts-action";
import { useEffect, useState } from "react";

export function Feed() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPosts() {
			try {
				setLoading(true);
				const data = await getPostsAction();
				setPosts(data);
			} catch (err) {
				console.error("Failed to fetch posts:", err);
				setError("Failed to load posts. Please try again later.");
			} finally {
				setLoading(false);
			}
		}

		fetchPosts();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<p>Loading posts...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-64">
				<p className="text-red-500">{error}</p>
			</div>
		);
	}

	if (posts.length === 0) {
		return (
			<div className="flex justify-center items-center h-64">
				<p>No posts found. Be the first to post!</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8 w-full">
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}
