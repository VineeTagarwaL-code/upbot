import { Button } from "@/components/ui/button";
import { Github, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
export const Navbar = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <header className="py-6">
      <nav className="flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-white" />
          <span className="ml-2 text-2xl font-bold">UpBot</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            className="text-sm font-medium hover:text-gray-300 transition-colors"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-gray-300 transition-colors"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-gray-300 transition-colors"
            href="#"
          >
            About
          </Link>
          <Link
            className="flex items-center text-sm font-medium hover:text-gray-300 transition-colors"
            href="https://github.com/vineetagarwal-code/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 mr-1" />
            <span>1k</span>
          </Link>
          {data && data.user ? (
            <div>
              <Image
                src={data.user.image ? data.user.image : "/avatar.png"}
                alt="User profile picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ) : (
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black transition-colors"
            >
              Login
            </Button>
          )}
        </div>
        <Button className="md:hidden" variant="outline" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
      </nav>
    </header>
  );
};
