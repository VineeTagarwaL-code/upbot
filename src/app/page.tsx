"use client";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AnimateNoti } from "@/components/AnimateNoti";
import { Footer } from "@/components/Footer";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import RotatingIcons from "@/components/ui/RotatingIcons";
import Features from "@/components/Features";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { FlickeringGridList } from "@/components/Cta";
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#OEOCOA] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
        <Hero />
        <Features />
        <div className="w-full flex flex-col md:flex-row justify-between items-center overflow-hidden ">
          <RotatingIcons />
          <AnimateNoti />
        </div>
        <FlickeringGridList />
      </div>
    </div>
  );
}
