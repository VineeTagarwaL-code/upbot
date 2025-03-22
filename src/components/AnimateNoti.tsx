"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "./ui/animated-list";
import Image from "next/image";

interface Item {
  name: string;
  description: string;
  icon: React.ReactElement;
  time: string;
}

let notifications = [
  {
    name: "Server Down",
    description: "Upbot",
    time: "10m ago",

    icon: (
      <Image
        src="/assets/gmail.svg"
        alt="Discord Icon"
        width={34}
        height={34}
      />
    ),
  },
  {
    name: "Server Down",
    description: "Upbot",
    time: "10m ago",

    icon: (
      <Image
        src="/assets/discord.svg"
        alt="Discord Icon"
        width={34}
        height={34}
      />
    ),
  },
  {
    name: "Server Down",
    description: "Upbot",
    time: "5m ago",
    icon: (
      <Image
        src="/assets/gmail.svg"
        alt="Discord Icon"
        width={34}
        height={34}
      />
    ),
  },
  {
    name: "Server Down",
    description: "Upbot",
    time: "2m ago",
    icon: (
      <Image
        src="/assets/discord.svg"
        alt="Discord Icon"
        width={34}
        height={34}
      />
    ),
  },
];

notifications = Array.from({ length: 5 }, () => notifications).flat();

const Notification = ({ name, description, icon, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-gray-800 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg ">{name}</span>
            <span className="mx-1 ">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal ">{description}</p>
        </div>
      </div>
    </figure>
  );
};

export function AnimateNoti({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl border-none",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
