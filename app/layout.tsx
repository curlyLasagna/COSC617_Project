import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";
import { CustomTrigger, LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { StickyFooter } from "@/components/sticky-footer";
import { TopBar } from "@/components/top-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";

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

async function checkUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Error getting session:", error);
    return null;
  }

  return data.user || null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await checkUser();

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
            style={
              {
                "--sidebar-width": "18rem",
                "--sidebar-width-mobile": "18rem",
              } as React.CSSProperties
            }
          >
            <CustomTrigger />

            <div className="mx-auto" style={{ maxWidth: "1400px" }}>
              <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr_18rem] gap-0">
                {/* Left sidebar */}
                <div className="hidden lg:block sticky top-0 h-screen overflow-hidden border-r">
                  <LeftSidebar user={user} />
                </div>

                {/* Main content & Topbar */}
                <div className="w-full flex flex-col">
                  <TopBar />
                  <main className="flex-1 flex flex-col items-center transition-[padding] duration-200">
                    <div className="w-full max-w-2xl pt-4 px-2 lg:px-0">
                      {children}
                    </div>
                  </main>
                </div>

                {/* Right sidebar*/}
                <div className="hidden lg:block sticky top-0 h-screen overflow-hidden border-l">
                  <RightSidebar />
                </div>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
        {!user && <StickyFooter />}
      </body>
    </html>
  );
}
