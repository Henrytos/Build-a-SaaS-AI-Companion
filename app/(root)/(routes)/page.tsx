import { SearchInput } from "@/components/search-input";
import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <div className="text-lg font-medium px-4">
        <SearchInput />
      </div>
    </>
  );
}
