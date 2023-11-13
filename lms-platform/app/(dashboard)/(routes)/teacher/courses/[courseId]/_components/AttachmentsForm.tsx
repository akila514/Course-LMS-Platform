"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const AttachmentsForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((currunt) => !currunt);
  };

  const router = useRouter();

  const formSchema = z.object({
    url: z.string().min(1),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border bg-slate-100 rounded-md p-4 mt-5">
      <div className="font-medium items-center justify-between flex mx-auto">
        Course Attachments
        <Button className="mb-1" onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add an Attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-slate-500 text-sm italic mt-2">
              No attachments added yet
            </p>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachments"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete this course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentsForm;
