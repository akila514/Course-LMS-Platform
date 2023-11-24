import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./CourseSidebarItem";
import CouresProgressPage from "@/components/CouresProgressPage";

interface CourseSidebar {
  course: {
    id: string;
    title: string;
    chapters: {
      id: string;
      title: string;
      description: string | null;
      isFree: boolean;
      userProgress: UserProgress[] | null;
    }[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebar) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="h-full border-r flex-col overflow-y-auto shadow-sm px-5">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CouresProgressPage variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full mt-5">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isComplete={!!chapter.userProgress?.[0]?.isComplte || false}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
