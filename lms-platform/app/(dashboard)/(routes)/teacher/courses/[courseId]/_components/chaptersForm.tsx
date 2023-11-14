"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Grid, Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const router = useRouter();

  const [chapters, setChapters] = useState(initialData.chapters);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreting = () => {
    setIsCreating((currunt) => !currunt);
  };

  const formSchema = z.object({
    title: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newChapter = await axios.post(
        `/api/courses/${courseId}/chapters`,
        values
      );
      toast.success("Chapter created");
      toggleCreting();

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updatedData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updatedData,
      });

      toast.success("Chapteres reordered");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="border bg-slate-100 rounded-md p-4 mt-5">
      <div className="font-medium items-center justify-between flex mx-auto">
        Course Chapters
        <Button className="mb-1" onClick={toggleCreting} variant="ghost">
          {isCreating && <>Cancel</>}
          {!isCreating && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to course...'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>What is this course about</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-4 w-[100px]"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <>
          <div
            className={cn(
              "text-sm mt-2",
              initialData.chapters.length === 0 && "text-slate-500 italic"
            )}
          >
            {!initialData.chapters.length && <p>No Chapters added yet</p>}
            {initialData.chapters.length > 0 && (
              <>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="chapters">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                          <Draggable
                            key={chapter.id}
                            draggableId={chapter.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={cn(
                                  "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                  chapter.isPublished &&
                                    "bg-sky-100 border-sky-200 text-sky-700"
                                )}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div
                                  className={cn(
                                    "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                    chapter.isPublished &&
                                      "border-r-sky-200 hover:bg-sky-200"
                                  )}
                                  {...provided.dragHandleProps}
                                >
                                  <Grip className="h-5 w-5" />
                                </div>
                                {chapter.title}
                                <div className="ml-auto pr-2 flex items-center gap-x-2">
                                  {chapter.isFree && <Badge>Free</Badge>}
                                  <Badge
                                    className={cn(
                                      "bg-slate-500",
                                      chapter.isPublished && "bg-sky-700"
                                    )}
                                  >
                                    {chapter.isPublished
                                      ? "Published"
                                      : "Draft"}
                                  </Badge>
                                  <Pencil
                                    onClick={() => {}}
                                    className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
          </p>
        </>
      )}
    </div>
  );
};

export default ChaptersForm;
