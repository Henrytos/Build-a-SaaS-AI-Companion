import { Categories } from "@/components/categories";
import { SearchInput } from "@/components/search-input";
import { prismadb } from "@/lib/prismadb";
import { Companions } from "./components/companions";

interface RootProps {
  params: {
    categoryId: string;
    name: string;
  };
}

export default async function RootPage({ params }: RootProps) {
  const companions = await prismadb.companion.findMany({
    where: {
      categoryId: params.categoryId,
      name: {
        search: params.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();
  return (
    <>
      <div className="text-lg font-medium px-4">
        <SearchInput />

        <Categories data={categories} />

        <h2 className=" mt-4 mb-2 font-bold">Companions</h2>
        <Companions data={companions} />
      </div>
    </>
  );
}
