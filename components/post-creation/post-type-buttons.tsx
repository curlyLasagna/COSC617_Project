"use client";
import { cn } from "@/lib/utils";
import { createPostAction } from "@/utils/posts/create-post-action";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { TextEditor } from "./text-editor";

const postTypes = [
	{
		name: "Text",
		icon: "Aa",
		bgColor: "bg-blue-500 hover:bg-blue-600",
		size: "h-12 w-12",
	},
	{
		name: "Photo",
		icon: "📷",
		bgColor: "bg-green-500 hover:bg-green-600",
		size: "h-12 w-12",
	},
	{
		name: "Link",
		icon: "🔗",
		bgColor: "bg-yellow-500 hover:bg-yellow-600",
		size: "h-12 w-12",
	},
	{
		name: "Video",
		icon: "🎥",
		bgColor: "bg-red-500 hover:bg-red-600",
		size: "h-12 w-12",
	},
];

interface PostTypeButtonsProps {
	className?: string;
	buttonSize?: string;
	iconSize?: string;
	showLabels?: boolean;
}

export function PostTypeButtons({
	className,
	buttonSize = "h-16 w-16",
	iconSize = "text-2xl",
	showLabels = true,
}: PostTypeButtonsProps) {
	const [activeEditor, setActiveEditor] = useState<
		"text" | "image" | "video" | "link" | null
	>(null);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleButtonClick = (type: string) => {
		if (isPending) return;
		switch (type) {
			case "Text":
				setActiveEditor("text");
				break;
			case "Photo":
				setActiveEditor("image");
				break;
			case "Video":
				setActiveEditor("video");
				break;
			case "Link":
				setActiveEditor("link");
				break;
		}
	};

	const handleSubmit = async (type: string, content: any) => {
		startTransition(async () => {
			try {
				const formData = new FormData();
				formData.append("postType", type.toLowerCase());

				if (type === "Text") {
					formData.append("title", content.title || "");
					formData.append("content", content.content || "");
				} else {
					formData.append(
						"mediaUrl",
						type === "Photo"
							? content.imageUrl
							: type === "Video"
								? content.videoUrl
								: content.url,
					);
					formData.append("caption", content.caption || "");
				}

				const result = await createPostAction(formData);

				if (result?.success) {
					toast.success(result.message);
					router.refresh();
				} else {
					toast.error(result?.message || "Failed to create post");
				}
			} catch (error) {
				console.error("Post creation error:", error);
				toast.error("An unexpected error occurred");
			} finally {
				setActiveEditor(null);
			}
		});
	};

	return (
		<>
			<div className={cn("flex gap-4", className)}>
				{postTypes.map((type) => (
					<button
						key={type.name}
						onClick={() => handleButtonClick(type.name)}
						disabled={isPending}
						className={cn(
							"flex flex-col items-center gap-2",
							"transition-all duration-200 hover:scale-110",
							isPending && "opacity-50 cursor-not-allowed",
						)}
						aria-label={`Create ${type.name} post`}
					>
						<div
							className={cn(
								"rounded-full flex items-center justify-center",
								"text-white",
								type.bgColor,
								buttonSize,
								isPending && "animate-pulse",
							)}
						>
							<span className={iconSize}>{type.icon}</span>
						</div>
						{showLabels && (
							<span className="text-sm font-medium text-foreground">
								{type.name}
							</span>
						)}
					</button>
				))}
			</div>

			{/* Text Editor */}
			<TextEditor
				isOpen={activeEditor === "text"}
				onCancel={() => !isPending && setActiveEditor(null)}
				onSubmit={(content, title) => {
					handleSubmit("Text", { content, title });
				}}
				mode="text"
				isSubmitting={isPending}
			/>

			{/* Image Editor */}
			<TextEditor
				isOpen={activeEditor === "image"}
				onCancel={() => !isPending && setActiveEditor(null)}
				onSubmit={(imageUrl, caption) => {
					handleSubmit("Photo", { imageUrl, caption });
				}}
				mode="image"
				isSubmitting={isPending}
			/>

			{/* Video Editor */}
			<TextEditor
				isOpen={activeEditor === "video"}
				onCancel={() => !isPending && setActiveEditor(null)}
				onSubmit={(videoUrl, caption) => {
					handleSubmit("Video", { videoUrl, caption });
				}}
				mode="video"
				isSubmitting={isPending}
			/>

			{/* Link Editor */}
			<TextEditor
				isOpen={activeEditor === "link"}
				onCancel={() => !isPending && setActiveEditor(null)}
				onSubmit={(url, caption) => {
					handleSubmit("Link", { url, caption });
				}}
				mode="link"
				isSubmitting={isPending}
			/>
		</>
	);
}
