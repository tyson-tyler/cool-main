"use client";

import { Video } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dayjs from "@/vendor/devjs";
import { compactNumberFormat } from "@/utils/numUtils";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

interface VideoDetailCardProps {
  video: Video;
}

const VideoDetailCard: React.FC<VideoDetailCardProps> = ({ video }) => {
  const router = useRouter();

  const handleDeleteVideo = useCallback(() => {
    if (confirm("Are you want to delete the video")) {
      axios
        .delete(`/api/videos/${video.id}`)
        .then(() => {
          toast.success("Deleted Successfully");
          router.refresh();
        })
        .catch(() => toast.error("Video not found"));
    }
  }, [video.id]);
  const truncatedTitle =
    video.title.length > 20 ? video.title.slice(0, 20) + "..." : video.title;
  return (
    <div className="sm:mx-auto block mt-3 mb-3 w-full">
      <div
        key={video.id}
        className="relative w-full md:h-[400px] lg:h-[500px] sm:h-[400px] max-w-[20rem] h-[400px] m-auto aspect-video grid-container"
      >
        <Link href={`video/${video.id}`} prefetch={true}>
          <Image
            className="object-cover hover:scale-105 rounded-md duration-150 transtion-all ease-in"
            alt="video-detail"
            src={video.thumbnailSrc}
            layout="fill"
          />
        </Link>
      </div>

      <div className="flex gap-x-5 mt-4 flex-col justify-center">
        <h3 className="font-semibold text-lg text-center">{truncatedTitle}</h3>
      </div>
      <div className="flex flex-col text-center">
        <p className="dark:text-white text-black">
          {dayjs(video.createdAt).format("MM, D,YYYY")}
        </p>
        <p className="text-sm text-gray-400">Published</p>
      </div>
      <div className="flex flex-col text-center">
        <p className="dark:text-white text-black">
          {compactNumberFormat(video.viewCount)}
        </p>
        <p className="text-sm text-gray-400">Watches</p>
      </div>
      <Trash
        className="text-red-500 hover:opacity-75 cursor-pointer text-center w-full mt-2"
        onClick={handleDeleteVideo}
      />
    </div>
  );
};

export default VideoDetailCard;
