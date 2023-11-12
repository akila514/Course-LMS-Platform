"use client";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface fileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: fileUploadProps) => (
  <UploadDropzone<OurFileRouter>
    className="bg-slate-50 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
    endpoint={endpoint}
    onClientUploadComplete={(res) => {
      onChange(res?.[0].url);
      toast.success("File uploaded");
    }}
    onUploadError={(error: Error) => {
      toast.error("File upload failed." + error?.message);
    }}
    onUploadBegin={(name: string) => {
      toast.loading("Uploading: " + name);
    }}
  />
);
