import { Category, Course } from "@prisma/client";
import CourseCard from "./CourseCard";

type CourseWithProgressWithCategory = Course & {
  categorey: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="w-full flex flex-wrap gap-4 items-center justify-center mx-auto">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.categorey?.name!}
          />
        ))}
      </div>
      {items.length == 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
