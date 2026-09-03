import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "@/lib/theme-provider";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metis Analytica — Reliable Data. Smarter Operations.",
  description:
    "Metis Analytica helps teams design, build, and run reliable data systems — Data Infrastructure, Data Solutions, and Analytics.",
  icons: {
    icon: [
      { url: "/assets/PNG/LOGO%20ICON%20DARK%20GREY.png", type: "image/png" },
    ],
    shortcut: "/assets/PNG/LOGO%20ICON%20DARK%20GREY.png",
    apple: "/assets/PNG/LOGO%20ICON%20DARK%20GREY.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
