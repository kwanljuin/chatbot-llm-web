import type { Metadata } from "next";
import "./globals.css";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "TechCorp - Innovative Solutions for Modern Business",
  description:
    "Leading provider of innovative technology solutions, software development, and digital transformation services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingChatbot />
      </body>
    </html>
  );
}
