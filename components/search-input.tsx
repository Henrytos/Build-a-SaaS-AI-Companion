"use client";
import qs from "query-string";

import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebaunce } from "@/hooks/use-debaunce";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Search } from "lucide-react";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState<string>(name || "");

  const debaucedValue = useDebaunce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setValue(ev.target.value);
  };

  useEffect(() => {
    const query = {
      name: debaucedValue,
      categoryId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  }, [debaucedValue, categoryId, router]);

  return (
    <>
      <div className="relative">
        <Search className="w-4 h-4 absolute top-3 left-3" />
        <Input
          value={value}
          onChange={onChange}
          className="bg-primary/10 pl-8"
        />
      </div>
    </>
  );
};

export { SearchInput };
