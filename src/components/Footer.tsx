"use client";
import Link from "next/link";
export const Footer = () => {
  return (
    <div className="py-6 text-center border-t border-gray-800">
      <p className="text-xs text-gray-400">
        © 2023 UpBot Inc. All rights reserved.
      </p>
      <div className="mt-2 flex justify-center gap-4">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </div>
    </div>
  );
};
