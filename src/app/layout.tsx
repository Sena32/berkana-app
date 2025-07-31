import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from '@/components/providers/LoadingProvider';
import { SessionProvider } from "@/components/providers/SessionProvider";
import { SidebarProvider } from "@/context/SidebarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Berkana Academy",
  description: "Berkana Academy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <LoadingProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </LoadingProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
