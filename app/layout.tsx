import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/top-bar";
import { LeftSidebar, CustomTrigger } from "@/components/left-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StickyFooter } from "@/components/sticky-footer";
import { RightSidebar } from "@/components/RightSidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider
            style={{
              "--sidebar-width": "14rem",
              "--sidebar-width-mobile": "18rem"
            } as React.CSSProperties}>
            
            <CustomTrigger />
            
            <div className="mx-auto" style={{ maxWidth: "1200px" }}>
              <div className="grid grid-cols-1 lg:grid-cols-[14rem_1fr_14rem] gap-0">
                {/* Left sidebar */}
                <div className="hidden lg:block sticky top-0 h-screen border-r border-gray-200 dark:border-gray-800 overflow-y-auto overflow-x-hidden">
                  <LeftSidebar />
                </div>
                
                {/* Main content & Topbar */}
                <div className="w-full flex flex-col">
                  <TopBar/>
                  <main className="flex-1 flex flex-col items-center">
                    <div className="w-full max-w-2xl pt-4 px-2">
                      {children}
                    </div>
                  </main>
                </div>
                
                {/* Right sidebar*/}
                <div className="hidden lg:block sticky top-0 h-screen border-l border-gray-200 dark:border-gray-800">
                  <RightSidebar />
                </div>
              </div>
            </div>
          </SidebarProvider>
          <StickyFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}