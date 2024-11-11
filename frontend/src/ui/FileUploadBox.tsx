"use client";
import React, { useState } from "react";
import { FileUpload } from "../ui/file-upload";

export default function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className=" w-96 mx-auto h-64    border border-dashed bg-white border-neutral-200  rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
