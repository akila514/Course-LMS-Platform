import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChaptersForm from "../../_components/chaptersForm";
import { Editor } from "@/components/Editor";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFileds = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFileds})`;

  return (
    <div className="w-full">
      <div className="max-w-7xl flex mx-auto">
        <div className="md:ml-5 md:items-center md:justify-center h-full justify-center w-full">
          <div className="flex flex-col gap-y-2">
            <Link href={`/teacher/courses/${params.courseId}`}>
              <div className="flex items-center text-sm hover:opacity-75 transition mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go back course setup
              </div>
            </Link>
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700 mb-10">
              Complete all fields {completionText}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 pb-20  max-w-7xl">
            <div className="md:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-col w-full">
                  <div className="w-full text-start flex flex-row">
                    <IconBadge icon={LayoutDashboard} />
                    <p className="text-lg ml-2 font-medium flex my-auto text-sky-700">
                      Customize your chapter
                    </p>
                  </div>
                  <ChapterTitleForm
                    initialData={chapter}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                  />
                  <ChapterDescriptionForm
                    initialData={chapter}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                  />
                </div>
              </div>
              <div className="gap-6">
                <div className="flex items-center gap-x-2 mt-10">
                  <IconBadge icon={Eye} />
                  <h2 className="text-lg font-medium text-sky-700">
                    Access Settings
                  </h2>
                </div>
                <ChapterAccessForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:p-5">
              <div className="flex items-center gap-x-2 flex-col">
                <div className="w-full flex flex-row text-start gap-x-2">
                  <IconBadge icon={Video} />
                  <h2 className="text-lg text-sky-700 font-medium flex my-auto">
                    Add a video
                  </h2>
                </div>
                <ChapterVideoForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
