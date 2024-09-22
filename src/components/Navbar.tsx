import { Button } from "@/components/ui/button";
import { Github, Zap } from "lucide-react";
import Link from "next/link";
import { Navlogin } from "./Navlogin";
import { useState } from "react";

// NavItem component to reuse for each link
const NavItem = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  [key: string]: any;
}) => (
  <Link
    className="text-sm font-medium hover:text-gray-300 transition-colors"
    href={href}
    {...props}
  >
    {children}
  </Link>
);

const MenuIcon = () => (
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
);

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="flex items-center justify-between py-6">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-white" />
          <span className="ml-2 text-2xl font-bold">UpBot</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <NavItem href="#">Features</NavItem>
          <NavItem href="#">About</NavItem>
          <NavItem
            href="https://github.com/vineetagarwal-code/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 mr-1" />
          </NavItem>
          <Navlogin />
        </div>

        <Button
          className="md:hidden"
          variant="outline"
          size="icon"
          onClick={toggleMenu}
        >
          <MenuIcon />
        </Button>
      </nav>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <NavItem href="#">Features</NavItem>
          <NavItem href="#">About</NavItem>
          <NavItem
            href="https://github.com/vineetagarwal-code/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 inline-block mr-1" />
            <span>1k</span>
          </NavItem>
          <Navlogin />
        </div>
      )}
    </>
  );
};
