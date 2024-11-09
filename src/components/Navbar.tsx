"use client";
import { NAVBAR } from "@/constants/constants";
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  motion,
} from "framer-motion";
import { Zap } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Navlogin } from "./Navlogin";

export const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (direction < 0 && !visible) {
        setVisible(true);
      } else if (direction > 0 && visible) {
        setVisible(false);
      }
    }
  });
  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          y: -150,
          opacity: 1,
        }}
        animate={{
          y: visible ? -50 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="fixed z-[99999]  inset-x-0 mt-12 hidden w-full px-24 text-sm md:flex"
      >
        <SlideNavTabs></SlideNavTabs>
      </motion.nav>
    </AnimatePresence>
  );
};

type Position = {
  left: number;
  width: number;
  opacity: number;
};
const SlideNavTabs = () => {
  const { data: session, status } = useSession();
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 1,
  });
  return (
    <div className="fixed right-0 left-0 top-5 z-30 mx-auto text-white bg-transparent">
      <ul
        onMouseLeave={() => {
          setPosition((prev) => ({
            ...prev,
            opacity: 0,
          }));
        }}
        className="flex relative items-center py-3 px-5 mx-auto text-sm text-gray-200 bg-gradient-to-tr to-transparent rounded-full border-2 w-fit border-white/5 from-zinc-300/5 via-gray-400/5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-lg backdrop-filter"
      >
        <Tab setPosition={setPosition}>
          <Zap className="h-6 w-6 text-gray-500 hover:text-white transition-all" />
        </Tab>
        {NAVBAR.map((tab, index) => (
          <Link key={index} href={tab.link}>
            <Tab setPosition={setPosition}>{tab.title}</Tab>
          </Link>
        ))}
        <Tab setPosition={setPosition}>
          <Link href={"/dashboard"}>
            <Navlogin />
          </Link>
        </Tab>
        <Cursor position={position} />
      </ul>
    </div>
  );
};
const Tab = ({
  children,
  setPosition,
}: {
  children: React.ReactNode;
  setPosition: ({
    left,
    width,
    opacity,
  }: {
    left: number;
    width: number;
    opacity: number;
  }) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="block font-semibold relative z-10 py-2.5 px-3 text-xs text-gray-200 hover:text-white cursor-pointer md:py-2 md:px-5 md:text-base mix-blend-difference"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 bg-glass-gradient bg-transparent rounded-full md:h-10  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-lg backdrop-filter"
    />
  );
};
