import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Shuo Xu | Robotics and Safety-Critical Control",
    template: "%s | Shuo Xu",
  },
  description:
    "Academic homepage of Shuo Xu, a Ph.D. student at Peking University working on robotics, safety-critical control, and multi-agent systems.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SiteHeader />
          {children}
          <footer className="siteFooter">
            <p>© {new Date().getFullYear()} Shuo Xu</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
