"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function EmailDialog({
  email,
  setEmail,
  submitEmail,
}: {
  email: string;
  setEmail: (email: string) => void;
  submitEmail: () => void;
}) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && email.trim()) {
      submitEmail();
    }
  };
  return (
    <div className="block w-full px-28">
      <p>Enter your email to log in or register:</p>
      <div className="pt-5">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          onKeyDown={handleKeyDown}
        />
        <div className="pt-7">
          <Button
            onClick={() => {
              submitEmail();
            }}
            className="rounded-full w-full"
            disabled={!email.trim()}
          >
            Next <ArrowRight className="w-4 h-4 ml-2" strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
}
