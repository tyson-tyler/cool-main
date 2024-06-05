"use client";

import MediaUpload from "@/components/PhotoUpload";
import TextArea from "@/components/shared/TextArea";
import Image from "next/image";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";

interface VideoUploadFormProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  changeValue: (id: string, value: string) => void;
  thumbnailSrc: string;
  isLoading: boolean;
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({
  register,
  errors,
  changeValue,
  thumbnailSrc,
  isLoading,
}) => {
  return (
    <div className="w-full flex flex-col gap-6 mb-[100px]">
      <TextArea
        register={register}
        id="title"
        label="Title"
        errors={errors}
        disabled={isLoading}
        changeValue={changeValue}
        required
      />
      <TextArea
        register={register}
        id="description"
        label="Description"
        errors={errors}
        disabled={isLoading}
        changeValue={changeValue}
        required
      />

      <div className="mb-50">
        <MediaUpload
          onChange={(value) => !isLoading && changeValue("thumbnailSrc", value)}
        >
          {thumbnailSrc ? (
            <Image
              src={thumbnailSrc}
              alt="thumbnail"
              height={122}
              width={152}
              className={`w-full h-52 rounded-md object-contain
                ${!isLoading ? "cursor-pointer" : ""}`}
            />
          ) : (
            <div
              id="thumbnailSrc"
              {...register("thumbnailSrc", { required: true })}
              className={`w-full  h-52 dark:bg-gray-800 object-cover dark:text-white rounded-md flex justify-center items-center flex-col cursor-pointer ${
                errors["thumbnailSrc"] ? "border-red-500" : "border-purple-500"
              }`}
            >
              <BiImageAdd className="w-10 h-10 dark:text-gray-500" />
              <p className="text-gray-500 text-sm mt-3">Add the Thumbnail</p>
            </div>
          )}
        </MediaUpload>
      </div>
    </div>
  );
};

export default VideoUploadForm;
