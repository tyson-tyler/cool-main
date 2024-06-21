import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CreateChannelModalContext } from "@/context/CreateChannelModelContext";
import Input from "../shared/Input";
import MediaUpload from "../PhotoUpload";
import Avatar, { AvatarSize } from "../Avatar";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const CreateChannelModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createChannelModal = useContext(CreateChannelModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      handle: "",
      imageSrc: "",
    },
  });

  const imageSrc = watch("imageSrc");

  const handleImageUpload = (value: string) => {
    setValue("imageSrc", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true); // Start loading indicator

    axios
      .post("/api/channels", data)
      .then(() => {
        toast.success("Channel created successfully");
        createChannelModal?.onClose();
        router.refresh();
      })
      .catch((error) => {
        console.error("Error creating channel:", error);
        toast.error("Failed to create channel. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false); // Stop loading indicator
      });
  };

  return createChannelModal?.isOpen ? (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center z-50 dark:bg-gray-900 bg-white text-black dark:text-white shadow-md w-full lg:w-1/2 rounded-xl">
          <div className="flex justify-center items-center border-b p-3 border-gray-500">
            <h2 className="text-3xl font-bold usespan">Create Channel</h2>
          </div>
          <div className="flex flex-col items-center py-4 gap-5">
            <Avatar size={AvatarSize.large} imageSrc={imageSrc} />
            <MediaUpload onChange={handleImageUpload}>
              <Button className="p-2" variant={"ghost"}>
                Upload Image
              </Button>
            </MediaUpload>
            <Input
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              pattern={{
                value: /^[a-zA-Z0-9 ]*$/,
                message: "Invalid name format",
              }}
              required
              className={`w-3/4 mb-3 ${errors.name ? "border-red-500" : ""}`}
            />
            <Input
              id="handle"
              label="Username"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              className={`w-3/4 ${errors.handle ? "border-red-500" : ""}`}
            />
          </div>
          <div className="p-2 border-t border-gray-600 flex justify-end gap-3">
            <Button
              variant={"ghost"}
              className="p-2"
              onClick={createChannelModal.onClose}
            >
              Cancel
            </Button>
            <Button
              className="p-2"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex">
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Creating ...
                </div>
              ) : (
                "Create Channel"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default CreateChannelModel;
