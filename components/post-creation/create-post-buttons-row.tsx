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
		<div className="w-full max-w-2xl mx-auto bg-gray-100 dark:bg-[#1a1a1a] rounded-lg">
			<div className="px-4 py-3">
				<PostTypeButtons
					onSelect={handleSelect}
					className="justify-center gap-20"
				/>
			</div>
		</div>
	);
}
