import { Feed } from "@/components/post-feed";

export default function HomePage() {
	return (
		<div className="flex-1 flex flex-col gap-6 px-4">
			<Feed />
		</div>
	);
}
