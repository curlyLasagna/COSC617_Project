import { Button } from "./ui/button";

export function StickyFooter() {
  return (
    <div className="sticky bottom-0 bg-[#7c5cff] max-w-none py-2 z-50">
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-y-2">
          Join over 100 million people using Fumblr to fumble the huzz
          <div className="flex flex-row gap-4 w-full justify-center">
            <Button className="w-full rounded-full bg-black text-white">Sign Up</Button>
            <Button className="w-full rounded-full bg-[#6f53e5] text-white">Log in</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
