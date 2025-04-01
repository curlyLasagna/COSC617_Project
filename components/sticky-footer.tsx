import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTrigger, Dialog, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

export function StickyFooter() {
  return (
    <div className="sticky bottom-0 bg-[#7c5cff] max-w-none py-2 z-50">
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-y-2">
          <div>Join over <b>100 million</b> people using Fumblr to fumble the <b>huzz</b></div>
          <div className="flex flex-row gap-4 w-full justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full rounded-full bg-black text-white hover:bg-black/90">Sign Up</Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button className="w-full rounded-full bg-[#6f53e5] hover:bg-[#6048c9]/90 text-white">Log in</Button>
              </DialogTrigger>
              <DialogContent className="p-0 pb-8">
                <div>
                  <DialogHeader>
                    <DialogTitle />
                  </DialogHeader>
                  <img className="w-full rounded-t-sm" src="https://media1.tenor.com/m/rDljTZkftN8AAAAC/anime-girl-blushing-anime.gif" />
                </div>
                <div className="flex items-center justify-center flex-col gap-5">
                  <p className="text-3xl">fumblr</p>
                  <form action="post">
                    <p>Enter your email to log in or register:</p>
                    <div className="pt-5">
                      <Input type="email" id="email" placeholder="Email" />
                      <div className="pt-7">
                        <Button className="rounded-full w-full">Next</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
