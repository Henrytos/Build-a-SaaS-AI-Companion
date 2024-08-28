import { NavBar } from "@/components/nav-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full  pt-16 px-6 md:px-14">
      <NavBar />
      {children}
    </main>
  );
}
