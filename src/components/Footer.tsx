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
    { icon: <SiHomeadvisor />, path: "/" },
    { icon: <BiSolidParty />, path: "/creator" },
    { icon: <GiFilmSpool />, path: "/shorts" },
    {
      icon: <BiSolidCloudUpload />,
      path: "/studio/upload",
      requiresChannel: true,
    },
    {
      icon: <RiAccountPinBoxFill />,
      path: currentChannel ? `/channel/${currentChannel.id}` : "",
      requiresChannel: true,
    },
    { icon: <FaGrinHearts />, path: "/like", requiresChannel: true },
    { icon: <FaPaintBrush />, path: "/studio", requiresChannel: true },
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
      <div className="flex justify-around max-w-[500px] m-auto p-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item.path, item.requiresChannel)}
            className="cursor-pointer text-2xl opacity-80 hover:opacity-100 transform transition hover:scale-110"
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
