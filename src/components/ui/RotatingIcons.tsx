"use client";

import { motion } from "framer-motion";

import {
  GitHubLogoIcon,
  NotionLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

import Discord from "/assets/discord.svg";
import Image from "next/image";
import { Zap } from "lucide-react";

const icons = [
  <div className="rounded-full bg-purple-600/20 p-4" key={1}>
    <Image
      src="/assets/discord.svg"
      alt="Discord Icon"
      width={34}
      height={34}
    />
  </div>,
  <div className="rounded-full bg-blue-800/20 p-4" key={2}>
    <Image src="/assets/gmail.svg" alt="Discord Icon" width={34} height={34} />
  </div>,
];

const RotatingIcons: React.FC = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-8 md:px-6 mt-10">
      <motion.h1
        {...{
          transition: { delay: 0.2 },
        }}
        className="text-center max-w-1xl  mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]  bg-clip-text text-4xl tracking-tighter  text-transparent md:text-4xl lg:text-5xl"
      >
        We notify you{" "}
        <span className="bg-gradient-to-r from-zinc-300 to-blue-200 bg-clip-text text-transparent">
          when your users need you
        </span>
      </motion.h1>
      <div className="flex items-center justify-center">
        <div className="relative m-2 mx-auto h-96 w-96 scale-[70%] md:scale-100 ">
          <div className="relative h-full w-full rounded-full border border-gray-800">
            {icons.map((icon, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 -translate-x-10 transform"
                style={{
                  originX: "200px",
                  originY: "-8px",
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear",
                  delay: index * 2.5,
                }}
              >
                <motion.div
                  style={{
                    rotate: index * 72,
                  }}
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "linear",
                    delay: index * 2.5,
                  }}
                >
                  {icon}
                </motion.div>
              </motion.div>
            ))}
            <Zap className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white h-24 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingIcons;
