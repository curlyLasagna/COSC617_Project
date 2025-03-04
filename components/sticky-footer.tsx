import { Button } from "./ui/button";

export function StickyFooter() {
    return (
        <div className="sticky bottom-0 bg-[#7c5cff] w-full py-2">
            <div className="">
                <div className="flex flex-col items-center gap-y-2">
                    <div>Join over 100 million people using Fumblr to fumble the huzz.</div>
                    <div className="flex flex-row gap-4">
                        <Button className="">Sign Up</Button>
                        <Button className="">Log in</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}