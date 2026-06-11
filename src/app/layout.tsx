import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://emc2-biotech.com"),
  title: "E=mc² Biotech | AutoImplant Guide - Automated Implant Positioning",
  description: "E=mc² Biotech's web platform for geometric algorithm-based implant guide design. Visualize and simulate automated implant positioning with the 0.5mm lingual offset golden rule.",
  keywords: ["E=mc2 Biotech", "AutoImplant Guide", "implant", "dental", "guide", "automation", "3D visualization"],
  alternates: {
    canonical: "/",
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
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
