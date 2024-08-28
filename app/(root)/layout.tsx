import { NavBar } from "@/components/nav-bar";
import { SideBar } from "@/components/side-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
        <SideBar />
      </div>
      <main className="w-full pt-20  md:pl-24">
        <NavBar />
        {children}
      </main>
    </div>
  );
}
