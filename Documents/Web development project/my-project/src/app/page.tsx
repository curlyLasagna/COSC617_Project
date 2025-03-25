import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  return (
    <div className="flex">
      {/* Main Content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Welcome to Your Tumblr Clone</h1>
      </main>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}