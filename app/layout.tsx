import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
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

const SITE_URL = 'https://metisanalytica.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Metis Analytica — Reliable Data. Smarter Operations.",
    template: "%s · Metis Analytica",
  },
  description:
    "Metis Analytica helps organizations design, build, and run reliable data systems — sovereign data infrastructure, custom analytics, and long-term custodianship for NGOs, SMEs, corporations, and government.",
  applicationName: "Metis Analytica",
  authors: [{ name: "Metis Analytica" }],
  creator: "Metis Analytica",
  publisher: "Metis Analytica",
  keywords: [
    "data infrastructure",
    "data platform",
    "data analytics",
    "data governance",
    "data custodianship",
    "business intelligence",
    "predictive analytics",
    "Uganda data company",
    "East Africa data",
    "NGO data platform",
    "SME analytics",
    "government data platform",
    "Metis",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Metis Analytica",
    title: "Metis Analytica — Reliable Data. Smarter Operations.",
    description:
      "We design, build, and run sovereign data infrastructure and analytics for institutions in emerging markets.",
    images: [
      {
        url: "/assets/PNG/LOGO%20DARK%20GREY.png",
        width: 1200,
        height: 630,
        alt: "Metis Analytica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metis Analytica — Reliable Data. Smarter Operations.",
    description:
      "Sovereign data infrastructure, custom analytics, and long-term custodianship for institutions in emerging markets.",
    images: ["/assets/PNG/LOGO%20DARK%20GREY.png"],
  },
  icons: {
    icon: [
      { url: "/assets/PNG/LOGO%20ICON%20DARK%20GREY.png", type: "image/png" },
    ],
    shortcut: "/assets/PNG/LOGO%20ICON%20DARK%20GREY.png",
    apple: "/assets/PNG/LOGO%20ICON%20DARK%20GREY.png",
  },
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
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
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <ThemeProvider>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
