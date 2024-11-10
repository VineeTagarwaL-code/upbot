import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Upbot",
  description: "Never let your server sleep while you do.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} px-2 md:px-0`}
      >
        <Providers>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
          <Toaster />
        </Providers>
        <Script
          defer
          src="https://unmani-vercel.vercel.app/script.js"
          data-website-id="94988ed9-5596-4612-9537-22e3915e4fca"
        ></Script>
      </body>
    </html>
  );
}
