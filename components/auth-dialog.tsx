"use client";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogTitle,
} from "./ui/dialog";

import { useState } from "react";
import { Input } from "./ui/input";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { signUpAction, signInAction, checkUserAction } from "@/app/actions";

export default function AuthDialog() {
    const [step, setStep] = useState<"email" | "log-in" | "sign-up" | "success">(
      "email"
    );
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      if (!isOpen) {
        setStep("email");
        setError("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
  
      const formData = new FormData();
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
                    <div className="block w-full px-28">
                      <p>Enter your email to log in or register:</p>
                      <div className="pt-5">
                        <Input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value.trim())}
                        />
                        <div className="pt-7">
                          <Button
                            onClick={() => {
                              submitEmail();
                            }}
                            className="rounded-full w-full"
                            disabled={!email.trim()}
                          >
                            Next{" "}
                            <ArrowRight
                              className="w-4 h-4 ml-2"
                              strokeWidth={3}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                case "log-in":
                  return (
                    <div className="block w-full px-28">
                      <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value.trim())}
                      />
                      <div className="pt-7">
                        <Button className="w-full" onClick={signIn}>
                          Next{" "}
                          <ArrowRight className="w-4 h-4 ml-2" strokeWidth={3} />
                        </Button>
                      </div>
                    </div>
                  );
                case "sign-up":
                  return (
                    <div className="block w-full px-28">
                      <div className="pt-5">
                        <Input
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value.trim())}
                        />
                        <div className="pt-2">
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) =>
                              setConfirmPassword(e.target.value.trim())
                            }
                          />
                        </div>
                        <div className="pt-7">
                          <Button className="w-full" onClick={signUp}>
                            Next{" "}
                            <ArrowRight
                              className="w-4 h-4 ml-2"
                              strokeWidth={3}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
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