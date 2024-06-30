"use client";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { Channel } from "@prisma/client";
import React, { useContext, useEffect } from "react";
import Avatar, { AvatarSize } from "./Avatar";
import { SiHomeadvisor } from "react-icons/si";
import MenuItems from "./MenuItems";
import { CreateChannelModalContext } from "@/context/CreateChannelModelContext";
import { useRouter, usePathname } from "next/navigation";
import { CurrentChannelContext } from "@/context/CreateChannelContext";
import SignInButton from "./UserOptions/SignInButton";
import { BiSolidParty, BiSolidCloudUpload } from "react-icons/bi";
import { GiFilmSpool } from "react-icons/gi";
import { IoIosBookmarks } from "react-icons/io";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { FaPaintBrush, FaKissWinkHeart } from "react-icons/fa";

interface SideBarProps {
  subscribedChannels: Channel[];
}

const LeftBar: React.FC<SideBarProps> = ({ subscribedChannels }) => {
  const currentUser = useContext(CurrentUserContext);
  const createChannelModal = useContext(CreateChannelModalContext);
  const router = useRouter();
  const pathname = usePathname();
  const currentChannel = useContext(CurrentChannelContext);

  useEffect(() => {
    router.prefetch("/about");
    router.prefetch("/creator");
    router.prefetch("/shorts");
    router.prefetch("/");
    if (currentChannel) {
      router.prefetch(`/channel/${currentChannel.id}`);
    }
    router.prefetch("/studio");
    router.prefetch("/studio/upload");
  }, [router, currentChannel]);

  const menuItems = [
    { name: "Home", icon: <SiHomeadvisor className="w-7 h-7" />, path: "/" },
    {
      name: "Popular",
      icon: <BiSolidParty className="w-7 h-7" />,
      path: "/creator",
    },
    {
      name: "Clips",
      icon: <GiFilmSpool className="w-7 h-7" />,
      path: "/shorts",
    },
    {
      name: "About",
      icon: <IoIosBookmarks className="w-7 h-7" />,
      path: "/about",
    },
    {
      name: "Channel",
      icon: <RiAccountPinBoxFill className="w-7 h-7" />,
      path: currentUser
        ? currentChannel
          ? `/channel/${currentChannel.id}`
          : ""
        : "",
      requiresChannel: true,
    },
    {
      name: "Studio",
      icon: <FaPaintBrush className="w-7 h-7" />,
      path: currentUser ? "/studio" : "",
      requiresChannel: true,
    },
    {
      name: "Like",
      icon: <FaKissWinkHeart className="w-7 h-7" />,
      path: currentUser ? "/like" : "",
      requiresChannel: true,
    },
    {
      name: "Upload",
      icon: <BiSolidCloudUpload className="w-7 h-7" />,
      path: currentUser ? "/studio/upload" : "",
      requiresChannel: true,
    },
  ];

  const handleClick = (path: any, requiresChannel = false) => {
    if (requiresChannel && !currentChannel) {
      createChannelModal?.onOpen();
    } else {
      router.push(path);
    }
  };

  return (
    <div className="sticky top-0 p-4 pt-20 h-screen hidden md:flex bg-gray-50 dark:text-white dark:bg-neutral-900 overflow-y-auto   text-black">
      <div className="space-y-6">
        {menuItems.map(
          (item, index) =>
            // Render menu item only if there's no requirement for current user or if there's a current user
            (!item.requiresChannel || currentUser) && (
              <div
                key={index}
                onClick={() => handleClick(item.path, item.requiresChannel)}
                className={`flex items-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md ${
                  pathname === item.path
                    ? "bg-purple-600 text-white hover:bg-purple-600"
                    : ""
                }`}
              >
                <div className="flex items-center gap-7 text-2xl">
                  {item.icon}
                </div>
              </div>
            )
        )}
        {currentUser ? (
          <div className="space-y-6">
            {subscribedChannels.map((channel) => (
              <MenuItems
                key={channel.id}
                channel={channel}
                label={channel.name}
                logo={
                  <Avatar imageSrc={channel.imageSrc} size={AvatarSize.extra} />
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">
            <span className="block font-bold mb-2">Please Sign In</span>
            <SignInButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftBar;
