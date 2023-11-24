import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/CoursesList";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="pl-5 max-w-5xl mx-auto flex md:items-center">
      <div className="flex flex-wrap gap-4">
        <CoursesList items={[...coursesInProgress, ...completedCourses]} />
      </div>
    </div>
  );
}
