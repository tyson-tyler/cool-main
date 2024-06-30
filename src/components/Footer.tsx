"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CurrentChannelContext } from "@/context/CreateChannelContext";
import { CreateChannelModalContext } from "@/context/CreateChannelModelContext";
import { SiHomeadvisor } from "react-icons/si";
import { BiSolidCloudUpload, BiSolidParty } from "react-icons/bi";
import { GiFilmSpool } from "react-icons/gi";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { FaPaintBrush, FaGrinHearts } from "react-icons/fa";

const Footer = () => {
  const createChannelModal = useContext(CreateChannelModalContext);
  const router = useRouter();
  const currentChannel = useContext(CurrentChannelContext);

  useEffect(() => {
    // Prefetch pages for better performance
    // router.prefetch("/");
    // router.prefetch("/creator");
    // router.prefetch("/shorts");
    // router.prefetch("/studio");
    // router.prefetch("/studio/upload");
    // if (currentChannel) {
    //   router.prefetch(`/channel/${currentChannel.id}`);
    // }
  }, [router, currentChannel]);

  const menuItems = [
    { icon: <SiHomeadvisor />, path: "/", name: "Home" },
    { icon: <BiSolidParty />, path: "/creator", name: "Popular" },
    { icon: <GiFilmSpool />, path: "/shorts", name: "Clips" },
    {
      icon: <BiSolidCloudUpload />,
      path: "/studio/upload",
      name: "Upload",
      requiresChannel: true,
    },
    {
      icon: <RiAccountPinBoxFill />,
      path: currentChannel ? `/channel/${currentChannel.id}` : "",
      requiresChannel: true,
      name: "Channel",
    },
    {
      icon: <FaGrinHearts />,
      path: "/like",
      requiresChannel: true,
      name: "Like",
    },
    {
      icon: <FaPaintBrush />,
      path: "/studio",
      requiresChannel: true,
      name: "Studio",
    },
  ];

  const handleItemClick = (path: any, requiresChannel = false) => {
    if (requiresChannel && !currentChannel) {
      createChannelModal?.onOpen();
    } else {
      router.push(path);
    }
  };

  return (
    <div className="fixed bottom-0 w-full  bg-gray-200 shadow-md dark:bg-neutral-900 z-10 md:hidden">
      <div className="flex justify-around max-w-[500px] m-auto py-2">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item.path, item.requiresChannel)}
            className="cursor-pointer  opacity-80 hover:opacity-100 transform transition hover:scale-110 justify-center items-center flex flex-col"
          >
            {item.icon}
            <div className="text-[12px] text-center font-semibold">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
