import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ToggleTheme } from "@/components/toggle-theme";
import { Menu, Star, Stars } from "lucide-react";
import { MobileSidebar } from "./mobile-side-bar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const NavBar = () => {
  return (
    <header className="w-full flex justify-between items-center  fixed top-0 left-0 px-6 md:px-14 border-b border-secondary/80 h-16 z-50 bg-secondary">
      <div>
        <Link href="/" className="hidden md:block">
          <h1 className={cn("md:text-3xl font-bold", poppins.className)}>
            companion.ai
          </h1>
        </Link>
        <div className="md:hidden">
          <MobileSidebar />
        </div>
      </div>
      <div className=" flex items-center gap-3">
        <Button variant="premiun" size="sm">
          upgrade
          <Stars size="16" className="ml-1 fill-primary" />
        </Button>
        <ToggleTheme />
        <UserButton />
      </div>
    </header>
  );
};

export { NavBar };
