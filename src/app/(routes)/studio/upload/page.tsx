"use client";

import UploadVideoModel from "@/components/Modal/UploadVideoModel";
import { Button } from "@/components/ui/button";
import VideoUploadForm from "@/components/studio/upload/VideoUploadForm";
import { UploadVideoModeContext } from "@/context/UploadVideoModelContext";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { useContext, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useProtectedRoute } from "@/hooks/useProtectedRoutes";
import { Loader } from "lucide-react";

export default function UploadPage() {
  useProtectedRoute();
  const uploadVideoModal = useContext(UploadVideoModeContext);

  useEffect(() => uploadVideoModal?.onOpen(), []);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      thumbnailSrc: "",
      videoSrc: "",
    },
  });

  const videoId = useMemo(() => {
    const buffer = Buffer.alloc(12);

    return uuid({}, buffer).toString("hex");
  }, []);

  const thumbnailSrc: string = watch("thumbnailSrc");
  const videoSrc: string = watch("videoSrc");
  const changeValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/videos", data)
      .then(() => {
        toast.success("Video is Public");
        router.push(`/video/${videoId}`);
        router.refresh();
        router.push("/");
        router.refresh();
        router.push("/studio");
        router.forward();
        router.push("/");
      })
      .catch(() => toast.error("something went wrong"))
      .finally(() => setIsLoading(false));
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {uploadVideoModal?.isOpen && (
        <UploadVideoModel
          onUpload={(value) => changeValue("videoSrc", value)}
        />
      )}

      <div className="flex flex-col px-7 pt-4 mt-[70px]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl usespan font-semibold">Upload</h1>
          <span className="flex gap-4">
            <Button
              variant={"ghost"}
              className="p-4 hover:opacity-75"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              className="p-3 hover:opacity-75"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex mr-2">
                  {" "}
                  <Loader className="mr-2 animate-spin w-5 h-5" />
                  Publishing
                </div>
              ) : (
                "Publish"
              )}
            </Button>
          </span>
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-6 md:gap-4">
          <VideoUploadForm
            register={register}
            errors={errors}
            changeValue={changeValue}
            thumbnailSrc={thumbnailSrc}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
