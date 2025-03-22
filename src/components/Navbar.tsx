"use client";
import { NAVBAR } from "@/constants/constants";
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  motion,
} from "framer-motion";
import { House, Logs, Zap } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Navlogin } from "./Navlogin";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const NavbarData = [
  {
    label: "Home",
    link: "/",
    icon: <House />,
  },
  {
    label: "GitHub",
    link: "https://github.com/vineetagarwal-code/upbot",
    icon: <GitHubLogoIcon />,
  },
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <Logs />,
  },
];

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
    <>
      <DockMobile
        NavbarData={NavbarData}
        mobileClassName="rounded-full z-50 cursor-pointer md:flex  items-center  pointer-events-auto bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_-2px_4px_rgba(0,0,0,.05),0_-12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_20px_80px_-20px_#ffffff1f_inset] "
      />
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
          <SlideNavTabs />
        </motion.nav>
      </AnimatePresence>
    </>
  );
};

const DockMobile = ({ mobileClassName, NavbarData }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden fixed bottom-3 right-5 z-90 mx-auto origin-bottom h-full max-h-14 z-[999999999]">
      <AnimatePresence>
        {open && (
          <motion.div className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2 items-center z-50">
            {NavbarData.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.06 },
                }}
                transition={{
                  delay: (NavbarData.length - 1 - idx) * 0.05,
                }}
              >
                <DockIcon
                  key={idx}
                  link={item.link}
                  icon={item.icon}
                  className="h-10 w-10 cursor-pointer rounded-full bg-neutral-900 flex items-center justify-center"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        onClick={() => setOpen(!open)}
        className={cn(
          "z-50 flex gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4",
          mobileClassName
        )}
      >
        <motion.span
          initial={{ rotate: 0 }}
          animate={open ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Zap className=" text-white transition-all" />
        </motion.span>
      </div>
    </div>
  );
};

type DockIconProps = {
  link?: string;
  icon: React.ReactNode;
  className?: string;
};
const DockIcon = ({ link, icon, className }: DockIconProps) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className={cn(className)}>
      <Link href={link!}>{icon}</Link>
    </motion.div>
  );
};

type Position = {
  left: number;
  width: number;
  opacity: number;
};
const SlideNavTabs = () => {
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
