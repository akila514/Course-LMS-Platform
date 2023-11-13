import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachmentsForm from "./_components/AttachmentsForm";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

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
    <div className="w-full">
      <div className="max-w-7xl flex mx-auto">
        <div className="md:ml-5 md:items-center md:justify-center h-full justify-center w-full">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700 mb-10">
              Complete all fields {completionText}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 pb-20 max-w-7xl">
            <div className="md:p-5">
              <div className="flex items-center justify-between"></div>
              <div className="gap-6">
                <div className="flex items-center">
                  <IconBadge icon={LayoutDashboard} />
                  <p className="text-lg ml-2 font-medium text-sky-700">
                    Customize your course
                  </p>
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
            <div className="mt-5 md:mt-0 md:p-5 space-y-6">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <p className="text-lg ml-2 font-medium text-sky-700">
                  Course Chapters
                </p>
              </div>
              <AttachmentsForm initialData={course} courseId={course.id} />
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <p className="text-lg ml-2 font-medium text-sky-700">
                  Sell your course
                </p>
              </div>
              <PriceForm courseId={course.id} initialData={course} />
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <p className="text-lg ml-2 font-medium text-sky-700">
                  Resourses & Attachments
                </p>
              </div>
              <AttachmentsForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
