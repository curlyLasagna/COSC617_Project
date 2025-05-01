"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
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
	onSelect: (type: string, content?: any) => void;
	className?: string;
	buttonSize?: string;
	iconSize?: string;
	showLabels?: boolean;
}

export function PostTypeButtons({
	onSelect,
	className,
	buttonSize = "h-16 w-16",
	iconSize = "text-2xl",
	showLabels = true,
}: PostTypeButtonsProps) {
	const [activeEditor, setActiveEditor] = useState<
		"text" | "image" | "video" | "link" | null
	>(null);

	const handleButtonClick = (type: string) => {
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
			default:
				onSelect(type);
		}
	};

	return (
		<>
			<div className={cn("flex gap-4", className)}>
				{postTypes.map((type) => (
					<button
						key={type.name}
						onClick={() => handleButtonClick(type.name)}
						className={cn(
							"flex flex-col items-center gap-2",
							"transition-all duration-200 hover:scale-110",
						)}
						aria-label={`Create ${type.name} post`}
					>
						<div
							className={cn(
								"rounded-full flex items-center justify-center",
								"text-white",
								type.bgColor,
								buttonSize,
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
				onCancel={() => setActiveEditor(null)}
				onSubmit={(content, title) => {
					onSelect("Text", { content, title });
					setActiveEditor(null);
				}}
				mode="text"
			/>

			{/* Image Editor */}
			<TextEditor
				isOpen={activeEditor === "image"}
				onCancel={() => setActiveEditor(null)}
				onSubmit={(imageUrl, caption) => {
					onSelect("Photo", { imageUrl, caption });
					setActiveEditor(null);
				}}
				mode="image"
			/>

			{/* Video Editor */}
			<TextEditor
				isOpen={activeEditor === "video"}
				onCancel={() => setActiveEditor(null)}
				onSubmit={(videoUrl, caption) => {
					onSelect("Video", { videoUrl, caption });
					setActiveEditor(null);
				}}
				mode="video"
			/>

			{/* Link Editor */}
			<TextEditor
				isOpen={activeEditor === "link"}
				onCancel={() => setActiveEditor(null)}
				onSubmit={(url, caption) => {
					onSelect("Link", { url, caption });
					setActiveEditor(null);
				}}
				mode="link"
			/>
		</>
	);
}
