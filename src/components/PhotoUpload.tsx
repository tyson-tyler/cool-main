"use client";
import { CldUploadWidget } from "next-cloudinary";

declare global {
  var cloudinary: any;
}

interface MediaUploadProps {
  onChange: (value: string) => void;
}
const MediaUpload: React.FC<React.PropsWithChildren<MediaUploadProps>> = ({
  onChange,
  children,
}) => {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="s2ubbu4a"
      options={{ maxFiles: 1, resourceType: "image" }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open && open()} className="block">
            {children}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
export default MediaUpload;
