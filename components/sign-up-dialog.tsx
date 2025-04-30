import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SignUpDialog({
	setPassword,
	signUp,
	setConfirmPassword,
	setUsername,
}: {
	setPassword: (password: string) => void;
	signUp: () => void;
	setConfirmPassword: (password: string) => void;
	setUsername: (username: string) => void;
}) {
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			signUp();
		}
	};
	return (
		<div className="block w-full px-28">
			<div className="pt-5">
				<Input
					type="text"
					placeholder="Username"
					onKeyDown={handleKeyDown}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<div className="pt-2">
					<Input
						type="password"
						placeholder="Password"
						onKeyDown={handleKeyDown}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="pt-2">
					<Input
						type="password"
						placeholder="Confirm Password"
						onKeyDown={handleKeyDown}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className="pt-7">
					<Button className="w-full" onClick={signUp}>
						Next <ArrowRight className="w-4 h-4 ml-2" strokeWidth={3} />
					</Button>
				</div>
			</div>
		</div>
	);
}
