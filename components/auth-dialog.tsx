"use client";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

import { checkUserAction, signInAction, signUpAction } from "@/app/actions";
import { useState } from "react";
import { useEffect } from "react";
import EmailDialog from "./email-dialog";
import LoginDialog from "./login-dialog";
import SignUpDialog from "./sign-up-dialog";

export default function AuthDialog() {
	const [step, setStep] = useState<"email" | "log-in" | "sign-up" | "success">(
		"email",
	);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		if (!isOpen) {
			setStep("email");
			setError("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
			setUsername("");
		}
	}, [isOpen]);

	const submitEmail = async () => {
		setError("");

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError("Please enter a valid email address");
			setStep("email");
			return;
		}

		try {
			const userExists = await checkUserAction(email);
			setStep(userExists ? "log-in" : "sign-up");
		} catch (error) {
			console.error("Error checking user existence:", error);
			setError("Failed to check user existence. Please try again.");
			setStep("email");
		}
	};

	const signIn = async () => {
		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);

		const result = await signInAction(formData);

		if (!result.success) {
			setError(result.message);
		} else {
			setIsOpen(false);
		}
	};

	const signUp = async () => {
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (password.length < 6) {
			setError("Password should be at least 6 characters long");
			return;
		}

		//TODO: check if username is already taken
		if (username.length < 10) {
			setError("Username should be at least 10 characters long");
			return;
		}

		const formData = new FormData();
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);

		const result = await signUpAction(formData);

		if (!result.success) {
			setError(result.message);
		} else {
			setStep("success");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-full rounded-full bg-black text-white hover:bg-black/9">
					Sign Up
				</Button>
			</DialogTrigger>
			<DialogTrigger asChild>
				<Button className="w-full rounded-full bg-[#6f53e5] text-white hover:bg-[#6048c9]/90">
					Log In
				</Button>
			</DialogTrigger>
			<DialogContent className="p-0 pb-8 w-[600px] max-w-[80vw]">
				<div>
					<DialogHeader>
						<DialogTitle />
					</DialogHeader>
					<img
						alt="cute anime girl"
						className="w-full rounded-t-sm"
						src="https://media1.tenor.com/m/rDljTZkftN8AAAAC/anime-girl-blushing-anime.gif"
					/>
				</div>
				<div className="flex items-center justify-center flex-col gap-5">
					<p className="text-3xl">fumblr</p>
					{(() => {
						switch (step) {
							case "email":
								return (
									<EmailDialog
										email={email}
										setEmail={setEmail}
										submitEmail={submitEmail}
									/>
								);
							case "log-in":
								return (
									<LoginDialog setPassword={setPassword} signIn={signIn} />
								);
							case "sign-up":
								return (
									<SignUpDialog
										setPassword={setPassword}
										setConfirmPassword={setConfirmPassword}
										signUp={signUp}
										setUsername={setUsername}
									/>
								);
							case "success":
								return (
									<div className="block w-full px-28 text-center">
										"Thanks for signing up! Please check your email for a
										verification link."
									</div>
								);
						}
					})()}
					{error && <div className="text-red-500 text-sm mb-4">{error}</div>}
				</div>
			</DialogContent>
		</Dialog>
	);
}
