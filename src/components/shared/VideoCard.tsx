"use client";

import { Channel, Video } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Avatar, { AvatarSize } from "../Avatar";
import { compactNumberFormat } from "@/utils/numUtils";
import dayjs from "@/vendor/devjs";
import { Suspense } from "react";
import SuspenseImage from "./SuspenseImage";

interface VideoCardProps {
  channel?: Channel;
  channelAvatar?: string;
  video: Video;
  includeDescription?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  channel,
  video,
  includeDescription = false,
}) => {
  const truncatedTitle =
    video?.title.length > 20 ? video.title.slice(0, 20) + "..." : video.title;

  return (
    <Link
      className="m-auto w-full block mt-13 mb-3"
      href={`/video/${video.id}`}
      prefetch
    >
      <div className="relative w-full flex justify-center md:h-[500px] lg:h-[550px] sm:h-[500px] h-[400px] aspect-video">
        <Suspense fallback={"loading"}>
          <Image
            className="object-cover rounded-md transition ease-in-out transform md:hover:scale-95"
            src={video.thumbnailSrc}
            alt="thumbnail"
            loading="lazy"
            layout="responsive"
            width={500} // Set a default width
            height={300} // Set a default height
            placeholder="blur"
            blurDataURL="/blur.svg"
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </Suspense>
      </div>

      <div className="flex gap-x-5 mt-4 flex-col">
        {channel && (
          <div className="flex gap-2 items-center">
            <Avatar size={AvatarSize?.medium} imageSrc={channel?.imageSrc} />
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">{truncatedTitle}</h3>
              <p className="text-gray-500 text-sm whitespace-nowrap">
                {channel?.name}
              </p>
            </div>
          </div>
        )}
        <p className="text-gray-500 text-sm mt-2 mb-1">
          {compactNumberFormat(video?.viewCount)} views * {""}
          {dayjs(video?.createdAt).fromNow()}
        </p>
        {includeDescription && (
          <div className="whitespace-pre-line text-sm text-gray-500">
            {video?.description.split("/n").map((line, index) => {
              return line === "" ? (
                <br key={index} />
              ) : (
                <p key={index}>{line}</p>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
};

export default VideoCard;
