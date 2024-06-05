"use client";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { Channel } from "@prisma/client";
import { useContext, useState } from "react";
import Avatar, { AvatarSize } from "../Avatar";
import { compactNumberFormat } from "@/utils/numUtils";
import Link from "next/link";
import { Button } from "../ui/button";
import SubscribeButton from "../SubscribeButton";
import UpdateProfileModal from "../Modal/UpdateChannelModel";

interface ChannelHeaderProps {
  channel: Channel;
  videoCount: number;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({
  channel,
  videoCount,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
    useState(true);

  // Function to handle opening the UpdateProfileModal when avatar is clicked
  const handleAvatarClick = () => {
    setIsUpdateProfileModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 md:gap-6 py-6 justify-between items-center lg:mt-[80px] lg:px-6">
        <div className="flex flex-col lg:flex-row gap-0 md:gap-0 md:justify-center items-center md:items-center lg:items-start mt-28 sm:mt-28 lg:mt-0">
          <Avatar
            size={AvatarSize.large}
            imageSrc={channel.imageSrc}
            onClick={handleAvatarClick} // Add onClick handler to open UpdateProfileModal
            className="cursor-pointer" // Change cursor to pointer
          />
          <div className="flex flex-col pt-4 gap-4 md:gap-1 lg:gap-1 lg:ml-3 md:justify-center">
            <h1 className="text-2xl text-center lg:text-start font-semibold">
              {channel.name}
            </h1>
            <div className="flex flex-col md:flex-row md:justify-center lg:justify-normal text-center items-center gap-1 md:gap-3 text-gray-500">
              <p className="font-medium text-black dark:text-white text-center items-center">{`@${channel.handle}`}</p>
            </div>
            <div className="flex space-around">
              <p className="mr-4 text-black dark:text-white">{`${compactNumberFormat(
                channel.subscriberCount
              )} Follower`}</p>
              <p className="text-black dark:text-white">{`${compactNumberFormat(
                videoCount
              )} Videos`}</p>
            </div>
          </div>
        </div>
        {channel.userId === currentUser?.id ? (
          <Link href={"/studio"} prefetch={true}>
            <Button className="p-2 hover:opacity-70 cursor-pointer">
              Manage Videos
            </Button>
          </Link>
        ) : (
          <SubscribeButton channelId={channel.id} />
        )}
      </div>
      {/* Render the UpdateProfileModal when isUpdateProfileModalOpen is true */}
      {isUpdateProfileModalOpen && <UpdateProfileModal />}
    </>
  );
};

export default ChannelHeader;
