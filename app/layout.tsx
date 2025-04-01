import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/top-bar";
import { LeftSidebar, CustomTrigger } from "@/components/left-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StickyFooter } from "@/components/sticky-footer";
import { RightSidebar } from "@/components/RightSidebar";
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
    console.error("Error getting session:", error);
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
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider
            style={
              {
                "--sidebar-width": "14rem",
                "--sidebar-width-mobile": "18rem",
              } as React.CSSProperties
            }
          >
            <div className="flex">
              {/* Left Sidebar */}
              <LeftSidebar />

              {/* Main Content with Right Sidebar */}
              <div className="flex flex-1">
                <main className="flex-1 flex flex-col justify-center px-10">
                  <CustomTrigger />
                  <div className="flex-1 flex flex-col">
                    <TopBar />
                  </div>
                  <div className="flex flex-col gap-20 max-w-5xl p-5">
                    {children}
                  </div>
                  <ThemeSwitcher />
                </main>

                {/* Right Sidebar */}
                <RightSidebar />
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
        {!user && <StickyFooter />}
      </body>
    </html>
  );
}