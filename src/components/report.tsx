"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Video } from "@prisma/client";
import { AlertCircle, X } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface VideoCardProps {
  video: Video;
}

const Report: React.FC<VideoCardProps> = ({ video }) => {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendMail = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        subject,
        message,
      }),
    });
    console.log(await response.json);
  };

  const handleclose = () => {
    router.push(`/about`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full p-4 justify-center items-center flex"
        >
          <AlertCircle className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Video</DialogTitle>
          <DialogDescription>
            Please check the reason of Report Video
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 py-4">
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <div className="w-full">
              <Input
                className="w-full"
                placeholder="Report Title"
                name="title"
                type="text"
                id="title"
                required
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>
            <Textarea
              className="w-full"
              name="description"
              id="description"
              required
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Write a brief about why you report this video"
            />
            <div className="w-full">
              <Input
                className="w-full"
                placeholder={`https://www.myaimix.com/video${video.id}`}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                disabled
              />
            </div>
            <div className="flex gap-2">
              <Button variant={"outline"} onClick={handleclose}>
                <X className="w-5 h-5 mr-1" />
                Cancel
              </Button>

              <Button variant={"destructive"} type="submit">
                <AlertCircle className="w-5 h-5 mr-3" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Report;
