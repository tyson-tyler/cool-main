"use client";

import { UploadVideoModeContext } from "@/context/UploadVideoModelContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MdClose } from "react-icons/md";
import MediaUpload from "../MediaUpload";
import { UploadCloudIcon } from "lucide-react";
import { Button } from "../ui/button";

interface UploadVideoModalProps {
  onUpload: (value: string) => void;
}

const UploadVideoModel: React.FC<UploadVideoModalProps> = ({ onUpload }) => {
  const router = useRouter();
  const uploadVideoModal = useContext(UploadVideoModeContext);

  const handleUpload = (value: string) => {
    onUpload(value);
    uploadVideoModal?.onClose();
  };
  return (
    <div className="absolute mt-10 left-1/2 w-5/6 h-5/6 rounded-xl  transform -translate-x-1/2 -translatex-y-1/2 flex flex-col justify-start bg-gray-100 shadow-md text-black dark:bg-gray-700 dark:text-white mb-10 z-50">
      <div className="p-3 border-b border-gray-500 flex justify-between">
        <h1 className="text-xl font-bold usespan text-center">Upload Video</h1>
        <MdClose
          className="h-6 w-6 cursor-pointer hover:opacity-75"
          onClick={() => {
            uploadVideoModal?.onClose();
            router.back();
          }}
        />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        <MediaUpload onChange={handleUpload}>
          <div>
            <UploadCloudIcon className="h-20 w-20 m-8 text-neutral-400 cursor-pointer" />
          </div>
        </MediaUpload>
        <div className="flex flex-col items-center">
          <p>Choose the files to Upload</p>
          <p className="text-sm text-neutral-400 mt-1">
            Video will be private until you publish them
          </p>
        </div>
        <MediaUpload onChange={handleUpload}>
          <Button className="p-4">Choose files</Button>
        </MediaUpload>
      </div>
    </div>
  );
};
export default UploadVideoModel;
