import { Channel, Video } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Avatar, { AvatarSize } from "../components/Avatar";
import { compactNumberFormat } from "@/utils/numUtils";
import dayjs from "@/vendor/devjs";
import { Button } from "./ui/button";

interface VideoCardProps {
  channel?: Channel;
  channelAvatar?: boolean;
  video?: Video; // Make video prop optional
  includeDescription?: boolean;
  isVertical?: boolean;
}

const VideoTrack: React.FC<VideoCardProps> = ({
  channel,
  channelAvatar = false,
  video,
  includeDescription = false,
  isVertical = true,
}) => {
  // Check if video is undefined or null
  if (!video) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image
          src={"/logo/em.svg"}
          width={100}
          height={100}
          alt="hello"
          className="mt-20"
        />
        <span className="font-semibold text-black dark:text-white p-4">
          No Video
        </span>
        <Link href={`/studio/upload`}>
          <Button size={"lg"} className="p-3">
            Create Now
          </Button>
        </Link>
      </div>
    ); // Placeholder message for no video
  }

  const truncatedTitle =
    video.title.length > 20 ? video.title.slice(0, 20) + "..." : video.title;

  return (
    <Link href={`/video/${video.id}`} prefetch={true}>
      <div className="relative flex justify-center md:h-[400px] lg:h-[500px] max-w-96 sm:h-[400px] h-[400px] aspect-video">
        <Image
          className="object-cover hover:scale-105 rounded-md duration-150 transtion-all ease-in"
          src={video.thumbnailSrc}
          alt="Thumbnail"
          layout="fill"
          loading="lazy"
        />
      </div>

      <div className="flex gap-x-5 mt-4 flex-col ml-4">
        <h3 className="font-semibold text-lg">{truncatedTitle}</h3>
        {channel ? (
          <div className="flex gap-2 items-center ">
            {!isVertical && channelAvatar ? (
              <Avatar
                size={AvatarSize.extraSmall}
                className="my-1"
                imageSrc={channel.imageSrc}
              />
            ) : null}

            <p className="text-gray-500 text-sm whitespace-nowrap">
              {channel.name}
            </p>
          </div>
        ) : null}
        <p className="text-gray-500 text-sm  mt-2 mb-1">
          {compactNumberFormat(video.viewCount)} watches •{" "}
          {dayjs(video.createdAt).fromNow()}
        </p>
        {includeDescription ? (
          <div className="whitespace-pre-line text-sm text-gray-500">
            {video.description.split("\n").map((line, index) => {
              return line === "" ? (
                <br key={index} />
              ) : (
                <p key={index}>{line}</p>
              );
            })}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default VideoTrack;
