"use client";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

interface CategoriesProps {
  data: Category[];
}

const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searcgParams = useSearchParams();

  const categoryId = searcgParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };
    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  };

  return (
    <div className="mt-6 w-full overflow-x-auto flex space-x-3 ">
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          `
          px-3 
          md:px-4
          py-2
          md:py-3
          hover:opacity-75
          text-xs
          md:text-sm
          rounded-lg
        `,
          !categoryId ? "bg-primary/20" : "bg-primary/10"
        )}
      >
        latest
      </button>

      {data.map((category) => (
        <button
          key={category.id}
          onClick={() => onClick(category.id)}
          className={cn(
            `
          px-3 
          md:px-4
          py-2
          md:py-3
          hover:opacity-75
          text-xs
          md:text-sm
          rounded-lg
        `,
            categoryId == category.id ? "bg-primary/20" : "bg-primary/10"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export { Categories };
