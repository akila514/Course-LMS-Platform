import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";

const SearchPage = async () => {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  return (
    <>
      <div className="px-2 md:px-5 my-5 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="px-2 md:px-5 max-w-5xl mx-auto flex">
        <Categories items={categories} />
      </div>
    </>
  );
};

export default SearchPage;
