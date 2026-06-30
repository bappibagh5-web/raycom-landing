import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppButton from "@/components/WhatsAppButton";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ray Communications – Blazing-Fast WiFi Broadband",
  description: "Ultra-fast home broadband internet by Ray Communications. Check availability in your area today.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sora">
        <ScrollProgressBar />
        <CursorGlow />
        <WhatsAppButton />
        {children}
      </body>
    </html>
  );
}
