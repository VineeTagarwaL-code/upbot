"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const Navlogin = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-8 w-8 rounded-full bg-white/50 animate-pulse block" />
    );
  }

  if (status === "unauthenticated") {
    return (
      <Button
        variant={"default"}
        className="text-white bg-transparent hover:bg-transparent px-0"
        onClick={() => {
          window.location.href = "/getstarted";
        }}
      >
        Login
      </Button>
    );
  }

  if (!session || !session.user) return null;

  return (
    <Image
      src={session.user.image || "/avatar.png"}
      alt="User profile picture"
      width={40}
      height={40}
      className="rounded-full"
    />
  );
};
