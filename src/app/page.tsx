"use client";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero-section";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center">
          <Hero />
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  );
}
