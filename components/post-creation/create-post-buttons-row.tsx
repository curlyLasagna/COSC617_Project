"use client";
import { PostTypeButtons } from "./post-type-buttons";

interface CreatePostButtonsRowProps {
	user?: any;
}

export function CreatePostButtonsRow({ user }: CreatePostButtonsRowProps) {
	if (!user) return null;

	const handleSelect = (type: string) => {
		console.log(`Creating ${type} post`);
	};

	return (
		<div className="w-full bg-gray-100 dark:bg-[#1a1a1a] rounded-lg">
			{" "}
			{/* Added rounded-lg */}
			<div className="max-w-2xl mx-auto px-10 py-3">
				{" "}
				{/* Added padding and centered content */}
				<PostTypeButtons
					onSelect={handleSelect}
					className="justify-center gap-20"
				/>
			</div>
		</div>
	);
}
