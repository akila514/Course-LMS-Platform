"use client";

import ConfirmModel from "@/components/models/ConfirmModel";
import { Button } from "@/components/ui/button";
import { UseConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const confetti = UseConfettiStore();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished ");
      }

      if (!isPublished) {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published ");

        confetti.onOpen();
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted ");
      router.refresh();

      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModel onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </ConfirmModel>
    </div>
  );
};

export default Actions;
