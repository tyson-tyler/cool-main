import { Channel, Video } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Avatar, { AvatarSize } from "../components/Avatar";
import { compactNumberFormat } from "@/utils/numUtils";
import dayjs from "@/vendor/devjs";

interface VideoCardProps {
  channel?: Channel;
  channelAvatar?: boolean;
  video: Video;
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
  const truncatedTitle =
    video.title.length > 20 ? video.title.slice(0, 20) + "..." : video.title;
  return (
    <Link className="mt-3 mb-3" href={`/video/${video.id}`} prefetch={true}>
      <div className="relative flex justify-center md:h-[400px] lg:h-[500px] max-w-96 sm:h-[400px] h-[400px] aspect-video">
        <Image
          className="object-cover hover:scale-105 rounded-md duration-150 transtion-all ease-in"
          src={video.thumbnailSrc}
          alt="thumatil"
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
          {compactNumberFormat(video.viewCount)} watchs * {""}
          {dayjs(video.createdAt).fromNow()}
        </p>
        {includeDescription ? (
          <div className="whitespace-pre-line text-sm text-gray-500">
            {video.description.split("/n").map((line, index) => {
              return line === "" ? <br key={index} /> : <p>{line}</p>;
            })}
          </div>
        ) : null}
      </div>
    </Link>
  );
};
export default VideoTrack;
