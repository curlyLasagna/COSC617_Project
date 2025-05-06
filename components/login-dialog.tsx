import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function LoginDialog({
	setPassword,
	signIn,
}: {
	setPassword: (password: string) => void;
	signIn: () => void;
}) {
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			signIn();
		}
	};
	return (
		<div className="block w-full px-28">
			<Input
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<div className="pt-7">
				<Button className="w-full" onClick={signIn}>
					Next <ArrowRight className="w-4 h-4 ml-2" strokeWidth={3} />
				</Button>
			</div>
		</div>
	);
}
