import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";
import { LeftSidebar, CustomTrigger } from "@/components/left-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
      <body className="bg-background text-foreground">
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
            <div className="flex">
              <LeftSidebar />
            </div>
            <main className="flex-1 flex flex-col justify-center px-10">
              <CustomTrigger />
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>
              <ThemeSwitcher />
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
