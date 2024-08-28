import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <div className="mx-5 mt-5 text-lg font-medium">
        home (protected)
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
