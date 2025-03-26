import RightSidebar from "@/components/ui/RightSidebar";

export default async function Home() {
  return (
    <div className="flex">
      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h1 className="text-2xl font-bold">Welcome to Fumblr</h1>
      </main>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}