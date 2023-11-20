import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pl-5">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
