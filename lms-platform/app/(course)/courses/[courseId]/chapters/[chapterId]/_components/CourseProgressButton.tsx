"use client";

import { Button } from "@/components/ui/button";
import { UseConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isComplete: boolean;
  nextChapterId: string;
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  isComplete,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const Icon = isComplete ? XCircle : CheckCircle;

  const router = useRouter();
  const confetti = UseConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        { isComplete: !isComplete }
      );

      if (!isComplete && !nextChapterId) {
        confetti.onOpen();
      }

      if (isComplete && !nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress updated.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full md:w-auto"
      type="button"
      variant={isComplete ? "outline" : "success"}
    >
      {isComplete ? "Not Completed" : "Mark as Complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};

export default CourseProgressButton;
