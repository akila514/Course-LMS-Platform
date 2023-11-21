"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { UseDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = UseDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const curruntCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          categoryId: curruntCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, curruntCategoryId, router, pathName]);
  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-sky-200"
        placeholder="Serch for a course"
      />
    </div>
  );
};

export default SearchInput;
