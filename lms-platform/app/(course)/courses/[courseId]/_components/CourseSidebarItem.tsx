"use client";

import { CheckCircle, LockIcon, PlayCircle } from "lucide-react";
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

  const Icon = isLocked ? LockIcon : isComplete ? CheckCircle : PlayCircle;

  const isActive = pathName?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button>
      <div className="flex flex-row space-x-2">
        <Icon />
        <p> {label}</p>
      </div>
    </button>
  );
};

export default CourseSidebarItem;
