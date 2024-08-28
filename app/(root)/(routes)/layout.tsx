import { NavBar } from "@/components/nav-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full  pt-20 px-14">
      <NavBar />
      {children}
    </main>
  );
}
