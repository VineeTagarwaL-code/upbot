"use client";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className=" text-gray-400 py-6 text-center flex justify-between items-center">
      <div className="text-sm mb-4">© 2024 upbot.vineet.tech</div>
      <div className="flex justify-center gap-8">
        <Link
          href="https://twitter.com/vineetwts"
          className="hover:text-gray-200"
        >
          Contact
        </Link>
        <Link
          href="https://twitter.com/vineetwts"
          target="_blank"
          className="hover:text-gray-200"
        >
          Twitter
        </Link>
        <Link
          href="https://github.com/vineetagarwal-code"
          target="_blank"
          className="hover:text-gray-200"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
};
