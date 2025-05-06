"use client";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import likeAction from "@/utils/posts/like-action";
import { Heart, MessageSquare, Repeat2 } from "lucide-react";

export const PostActions = ({ postId }: { postId: number }) => {
	const actions = [
		{ icon: MessageSquare, label: "Reply", action: (postId: number) => {} },
		{ icon: Repeat2, label: "Reblog", action: (postId: number) => {} },
		{ icon: Heart, label: "Like", action: likeAction },
	];
	// button formatting
	return (
		<div className="flex gap-2">
			{actions.map((action) => (
				<Tooltip key={action.label}>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="p-2"
							onClick={() => action.action(postId)}
						>
							<action.icon className="h-7 w-7" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>{action.label}</TooltipContent>
				</Tooltip>
			))}
		</div>
	);
};
