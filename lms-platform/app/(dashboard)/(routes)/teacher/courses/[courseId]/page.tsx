import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({ where: { id: params.courseId } });

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  const { userId } = auth();

  if (!userId || !course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.image,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="md:ml-5 md:items-center md:justify-center h-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Course Setup</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
          </div>
          <div className="gap-6 mt-10">
            <div className="flex items-center gap-x-4">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl ml-2">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />

            <DescriptionForm courseId={course.id} initialData={course} />

            <ImageForm initialData={course} courseId={course.id} />

            <CategoryForm
              courseId={course.id}
              initialData={course}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
        </div>
        <div>hkjk</div>
      </div>
    </div>
  );
};

export default CourseIdPage;
