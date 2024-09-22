"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export const Navlogin = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="h-8 w-8 rounded-full bg-white/50 animate-pulse block" />
    );
  }

  if (status === "unauthenticated") {
    return (
      <Button
        variant="outline"
        className="text-white border-white hover:bg-white hover:text-black transition-colors"
        onClick={() => signIn("google")}
      >
        Login
      </Button>
    );
  }

  if (!session || !session.user) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="p-0 cursor-pointer">
          <Image
            src={session.user.image || "/avatar.png"}
            alt="User profile picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-stone-900 text-white border-none"
      >
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut();
          }}
          className="cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
