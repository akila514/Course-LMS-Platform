import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";

interface SearchPageProps {
  searchParams: { title: string; categoreyId: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  const courses = await getCourses({ userId, ...searchParams });

  return (
    <>
      <div className="px-2 md:px-5 my-5 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="px-2 md:px-5 max-w-5xl mx-auto flex">
        <Categories items={categories} />
      </div>
      <div className="px-2 md:px-5 max-w-5xl mx-auto flex mt-5">
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
