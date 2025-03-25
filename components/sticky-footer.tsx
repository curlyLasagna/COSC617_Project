import { Button } from "./ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogTitle,
} from "./ui/dialog";

import Login from "./sign-in";
import SignUp from "./sign-up";

export const DialogComponent = (props: {
  className: string;
  content: React.ReactNode;
  action: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={props.className}>{props.action}</Button>
      </DialogTrigger>
      <DialogContent className="p-0 pb-8">
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
          {props.content}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function StickyFooter() {
  return (
    <div className="sticky bottom-0 bg-[#7c5cff] max-w-none py-2 z-50">
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-y-2">
          <div>
            Join over <b>100 million</b> people using Fumblr to fumble the{" "}
            <b>huzz</b>
          </div>
          <div className="flex flex-row gap-4 w-full justify-center">
            <DialogComponent
              className="w-full rounded-full bg-black text-white hover:bg-black/90"
              content={<SignUp />}
              action="Sign Up"
            />
            <DialogComponent
              className="w-full rounded-full bg-[#6f53e5] text-white hover:bg-[#6048c9]/90"
              content={<Login />}
              action="Log in"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
