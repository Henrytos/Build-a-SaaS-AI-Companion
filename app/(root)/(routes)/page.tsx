import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <div className="text-lg font-medium">
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
