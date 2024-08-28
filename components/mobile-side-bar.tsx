import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideBar } from "./side-bar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="p-0 m-0" side="left">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export { MobileSidebar };
