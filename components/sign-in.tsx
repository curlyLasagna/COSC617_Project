import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogTitle,
} from "./ui/dialog";

// TODO: Implement the ForgotPasswordDialog component
const ForgotPasswordDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-xs underline">Forgot Password?</p>
      </DialogTrigger>
      <DialogContent className="p-0">
        <div>
          <DialogHeader>
            <DialogTitle />
          </DialogHeader>
        </div>
        <div className="flex items-center justify-center flex-col gap-5">
          <p className="p-2">We've just sent you email with the reset link</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default async function Login() {
  return (
    <form className="flex flex-col min-w-64 mx-auto">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <ForgotPasswordDialog />
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
      </div>
    </form>
  );
}
