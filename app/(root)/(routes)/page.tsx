import { Categories } from "@/components/categories";
import { SearchInput } from "@/components/search-input";
import { prismadb } from "@/lib/prismadb";

export default async function HomePage() {
  const categories = await prismadb.category.findMany();
  return (
    <>
      <div className="text-lg font-medium px-4">
        <SearchInput />

        <Categories data={categories} />
      </div>
    </>
  );
}
