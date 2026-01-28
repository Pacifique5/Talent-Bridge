import type { Metadata } from "next";
import { ReduxProvider } from "@/store/Provider";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentBridge | Skills Challenges",
  description: "EdTech Product called Skills Challenges - Connecting talent with opportunities through project-based learning",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <ThemeProvider>
        <ReduxProvider>{children}</ReduxProvider>
      </ThemeProvider>
      </body>
      </html>
  );
}
