import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ellipsis, UserPlus } from "lucide-react";
import Link from "next/link";

interface UserAvatarProps {
	user?: {
		username?: string | null;
		profile_picture_url?: string | null;
	};
	isFollowing?: boolean;
	postTime?: Date | string;
}

export const UserAvatar = ({
	user = {},
	isFollowing = false,
	postTime = new Date(),
}: UserAvatarProps) => {
	// Safely handle postTime (could be Date object or string)
	const formattedDate =
		postTime instanceof Date
			? postTime.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				})
			: new Date(postTime).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				});

	// Safely handle user data
	const username = user?.username || "Anonymous";
	const profilePic = user?.profile_picture_url || null;
	const fallbackInitial = username.charAt(0).toUpperCase();

	return (
		<div className="flex justify-between items-start w-full">
			<Link
				href={`/${username}`}
				className="flex gap-3 items-center"
				onClick={(e) => !username && e.preventDefault()} // Prevent navigation if no username
			>
				<Avatar className="h-10 w-10">
					<AvatarImage src={profilePic || ""} />
					<AvatarFallback>{fallbackInitial}</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold hover:underline">{username}</p>
					<p className="text-xs text-muted-foreground">{formattedDate}</p>
				</div>
			</Link>

			<div className="flex gap-2">
				{!isFollowing && (
					<Button
						variant="outline"
						size="sm"
						className="gap-1 bg-white/10 rounded-full"
					>
						<UserPlus className="h-4 w-4" />
						Follow
					</Button>
				)}
				<Button variant="ghost" size="sm" className="p-1">
					<Ellipsis className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
};
