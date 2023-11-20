"use client";

import { db } from "@/lib/db";

const SearchPage = async () => {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="pl-5 max-w-5xl mx-auto flex md:items-center md:justify-center h-full">
      Search
    </div>
  );
};

export default SearchPage;
