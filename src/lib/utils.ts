import { PingTask } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: string): string => {
  const date = new Date(time);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short",
  }).format(date);
  return formattedDate;
};

export const GetLastPingTime = (pings: PingTask): string => {
  if (pings.logs.length === 0) return "No pings yet";
  const lastPingTime = new Date(
    pings.logs[pings.logs.length - 1].time
  ).getTime();
  const timeNow = new Date().getTime();

  const timeDifference = timeNow - lastPingTime;

  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

  if (minutesAgo < 1) return "Just now";
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  return `${Math.floor(hoursAgo / 24)}d ago`;
};
