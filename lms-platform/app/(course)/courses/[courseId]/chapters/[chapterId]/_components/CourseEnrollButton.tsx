"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch (error) {
      toast.error(`Something went wrong.${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full md:w-auto"
      size="sm"
    >
      Enroll for ${price}
    </Button>
  );
};

export default CourseEnrollButton;
