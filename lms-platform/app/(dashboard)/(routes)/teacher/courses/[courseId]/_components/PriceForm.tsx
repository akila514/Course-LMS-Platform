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
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((currunt) => !currunt);
  };

  const router = useRouter();

  const formSchema = z.object({
    price: z.coerce.number().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
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
        Course Price
        <Button className="mb-1" onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {"$" + initialData.price || "No Price entered"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <Input
                      placeholder="Set a price for your course"
                      type="number"
                      disabled={isSubmitting}
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What is the price of this course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-4 w-[100px]"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PriceForm;
