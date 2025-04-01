import AuthDialog from "./auth-dialog";
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
            <AuthDialog />
          </div>
        </div>
      </div>
    </div>
  );
}
