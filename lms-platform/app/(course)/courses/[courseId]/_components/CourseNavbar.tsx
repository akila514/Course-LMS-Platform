import NavbarRoutes from "@/components/NavbarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client";

interface courseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: courseNavbarProps) => {
  return (
    <div className="w-full justify-end align-middle items-end flex ml-auto p-4">
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
