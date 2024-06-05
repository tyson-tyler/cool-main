"use client";

import { CurrentUserContext } from "@/context/CurrentUserContext";
import { Channel, Video } from "@prisma/client";
import { useContext } from "react";
import Link from "next/link";
import Avatar, { AvatarSize } from "@/components/Avatar";
import { compactNumberFormat } from "@/utils/numUtils";
import SubscribeButton from "@/components/Sub";
import { Button } from "@/components/ui/button";
import LikeDisLikeButton from "../../LikeDisLikeButton";
import DialogDemo from "@/components/Sharearea";
import Report from "@/components/report";
// import Sharearea from "@/components/Sharearea";

interface LikeSubscribePageProps {
  channel: Channel;
  video: Video;
}
const LikeSubscribePage: React.FC<LikeSubscribePageProps> = ({
  video,
  channel,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Link href={`/channel/${channel.id}`} prefetch={true}>
            <Avatar size={AvatarSize.extra} imageSrc={channel.imageSrc} />
          </Link>
          <div className="flex flex-col justify-between mr-2">
            <Link href={`/channel/${channel.id}`} prefetch={true}>
              <h2 className="text-lg font-semibold">{channel.name}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              {compactNumberFormat(channel.subscriberCount)} Followers
            </p>
          </div>
        </div>
        <div>
          {" "}
          {channel.userId === currentUser?.id ? (
            <Link href="/studio" prefetch={false}>
              <Button className="p-2">Manage Video</Button>
            </Link>
          ) : (
            <SubscribeButton channelId={channel.id} />
          )}
        </div>
      </div>
      <div className="flex justify-evenly mt-5 items-center w-full">
        <LikeDisLikeButton video={video} />
        {/* <Sharearea /> */}
        <DialogDemo video={video} />
        <Report video={video} />
      </div>
    </>
  );
};

export default LikeSubscribePage;
