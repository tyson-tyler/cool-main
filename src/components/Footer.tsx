"use client";
import React, { useContext, useEffect } from "react";
import { Brush, CirclePlus, Eye, FilmIcon, Home } from "lucide-react";
import Link from "next/link";

import { HiMiniUserGroup } from "react-icons/hi2";

import { CurrentChannelContext } from "@/context/CreateChannelContext";
import { useRouter } from "next/navigation";
import { CreateChannelModalContext } from "@/context/CreateChannelModelContext";
import { MdAccountCircle } from "react-icons/md";
import { SiHomeadvisor } from "react-icons/si";
import { BiSolidCloudUpload, BiSolidParty } from "react-icons/bi";
import { GiFilmSpool } from "react-icons/gi";
import { IoImage } from "react-icons/io5";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { FaPaintBrush } from "react-icons/fa";
import { IoIosBookmarks } from "react-icons/io";

const items = [
  {
    logo: <SiHomeadvisor />,

    url: "/",
  },
  {
    logo: <BiSolidParty />,
    url: "/creator",
  },
  {
    logo: <GiFilmSpool />,
    url: "/shorts",
  },

  {
    logo: <IoImage />,

    url: "https://inter-main.vercel.app",
  },
];

const Footer = () => {
  const createChannelModal = useContext(CreateChannelModalContext);
  const router = useRouter();

  const currentChannel = useContext(CurrentChannelContext);
  useEffect(() => {
    // Prefetch the about page on component mount
    // router.prefetch("/about");
    // router.prefetch("/creator");
    // router.prefetch("/shorts");
    // router.prefetch("/");
    // router.prefetch(`/channel/${currentChannel?.id}`);
    // router.prefetch("/studio");
    // router.prefetch("/studio/upload");
  }, [router]);

  return (
    <div
      className={`fixed bottom-0 flex justify-center p-3 w-full items-center container z-10 bg-gray-200 shadow-md dark:bg-neutral-900 md:hidden mt-10 h-16`}
    >
      <div className="flex justify-between md:hidden">
        {items.map((item, index) => (
          <Link href={item.url} className="flex ml-3 mr-3" key={index}>
            <div className="flex  items-center gap-x-3  text-2xl my-5 opacity-80 hover:opacity-100 gap-6 transition hover:scale-105">
              <div className="flex">{item.logo}</div>
            </div>
          </Link>
        ))}
        <div className="flex gap-5 ml-3">
          <div
            onClick={() => {
              if (!currentChannel) createChannelModal?.onOpen();
              else router.push("/studio/upload");
            }}
            className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <BiSolidCloudUpload className="w-7 h-7" />
            </div>
          </div>

          <div
            onClick={() => {
              if (!currentChannel) {
                createChannelModal?.onOpen();
              } else {
                router.push(`/channel/${currentChannel.id}`);
              }
            }}
            className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <RiAccountPinBoxFill className="w-7 h-7" />
            </div>
          </div>
          <div
            onClick={() => {
              if (!currentChannel) {
                createChannelModal?.onOpen();
              } else {
                router.push(`/studio`);
              }
            }}
            className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <FaPaintBrush className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
