"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, LockIcon, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isComplete: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  id,
  label,
  isComplete,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isComplete ? CheckCircle : PlayCircle;

  const isActive = pathName?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-medium outline-none focus:outline-none transition-all pl-6 p-2 hover:text-slate-600 hover:bg-slate-300/20 rounded-md",
        isActive &&
          "text-slate-700 bg-slate-200 hover:bg-slate-200/20 hover:text-slate-700",
        isComplete && "text-emerald-700 hover:text-emerald-600",
        isComplete && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex flex-row space-x-2">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isComplete && "text-emerald-700"
          )}
        />
        <p> {label}</p>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-[20px] transition-all",
          isActive && "opacity-100",
          isComplete && "border-emerald-700"
        )}
      />
    </button>
  );
};

export default CourseSidebarItem;
