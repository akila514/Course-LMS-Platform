import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/CoursesList";
import { auth } from "@clerk/nextjs";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import InfoCard from "./_components/InfoCard";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="pl-5 max-w-5xl mx-auto space-y-10">
      <div className="flex flex-row items-center justify-start space-x-5 md:space-x-10">
        <InfoCard
          variant="default"
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          variant="default"
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
        />
      </div>
      <div className="max-w-5xl mx-auto flex md:items-center">
        <div className="flex flex-wrap gap-4">
          <CoursesList items={[...coursesInProgress, ...completedCourses]} />
        </div>
      </div>
    </div>
  );
}
