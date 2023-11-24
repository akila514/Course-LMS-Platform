"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/components/IconBadge";
import CouresProgressPage from "./CouresProgressPage";

interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

const CourseCard = ({
  id,
  title,
  image,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="w-[300px] flex flex-col border space-y-2 border-slate-200 p-4 rounded-md">
        <img src={image} className="object-cover h-[100px]" />
        <p className="text-lg font-medium ">{title}</p>
        <p className="text-muted-foreground text-sm">{category}</p>
        <div className="flex flex-row space-x-2">
          <IconBadge icon={BookOpen} size="sm" />
          <p className="text-muted-foreground text-sm">
            {chaptersLength} chapters
          </p>
        </div>
        {progress !== null ? (
          <div>
            <CouresProgressPage
              size="sm"
              value={progress}
              variant={progress === 100 ? "success" : "default"}
            />
          </div>
        ) : (
          <p className="font-medium">${price}</p>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
