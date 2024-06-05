"use client";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { Channel } from "@prisma/client";
import {
  Book,
  Brush,
  CirclePlus,
  EyeIcon,
  FilmIcon,
  HomeIcon,
  UsersRound,
} from "lucide-react";

import React, { useContext, useEffect } from "react";

import Avatar, { AvatarSize } from "./Avatar";
import MenuItems from "./Fe";

import { MdAccountCircle, MdCreate, MdWifiChannel } from "react-icons/md";
import { CreateChannelModalContext } from "@/context/CreateChannelModelContext";
import { useRouter } from "next/navigation";
import { CurrentChannelContext } from "@/context/CreateChannelContext";
import SignInButton from "./UserOptions/SignInButton";
import { SiHomeadvisor } from "react-icons/si";
import { BiSolidCloudUpload, BiSolidParty } from "react-icons/bi";
import { GiFilmSpool } from "react-icons/gi";
import { IoImage } from "react-icons/io5";
import { IoIosBookmarks } from "react-icons/io";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { FaPaintBrush } from "react-icons/fa";

interface SideBarProps {
  subscribedChannels: Channel[];
}

const LeftBar: React.FC<SideBarProps> = ({ subscribedChannels }) => {
  const currentUser = useContext(CurrentUserContext);
  const createChannelModal = useContext(CreateChannelModalContext);
  const router = useRouter();

  const currentChannel = useContext(CurrentChannelContext);
  useEffect(() => {
    // Prefetch the about page on component mount
    // router.prefetch("/");
    // router.prefetch("/creator");
    // router.prefetch("/shorts");
    // router.prefetch("/about");
    // router.prefetch(`/channel/${currentChannel?.id}`);
    // router.prefetch("/studio");
    // router.prefetch("/studio/upload");
  }, [router]);

  return (
    <div className="sticky top-1 h-screen sm:flex sm:flex-col sm:items-center lg:flex lg:items-start lg:mr-[28px] md:mr-[20px] max-md:hidden mt-10 lg:ml-[28px]">
      <div
        onClick={() => {
          router.push(`/`);
        }}
        className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
      >
        <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
          <SiHomeadvisor className="w-7 h-7" />
        </div>
      </div>
      <div
        onClick={() => {
          router.push(`/creator`);
        }}
        className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
      >
        <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
          <BiSolidParty className="w-7 h-7" />
        </div>
      </div>
      <div
        onClick={() => {
          router.push(`/shorts`);
        }}
        className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
      >
        <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
          <GiFilmSpool className="w-7 h-7" />
        </div>
      </div>
      <div
        onClick={() => {
          router.push(`https://inter-main.vercel.app/`);
        }}
        className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
      >
        <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
          <IoImage className="w-7 h-7" />
        </div>
      </div>
      <div
        onClick={() => {
          router.push(`/about`);
        }}
        className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
      >
        <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
          <IoIosBookmarks className="w-7 h-7" />
        </div>
      </div>

      {/* {currentChannel ? <div>
        
      </div> : null} */}
      {currentUser ? (
        <div className="flex items-center flex-col">
          <div
            onClick={() => {
              if (!currentChannel) {
                createChannelModal?.onOpen();
              } else {
                router.push(`/channel/${currentChannel.id}`);
              }
            }}
            className="flex flex-row justify-center  lg:justify-normal  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <RiAccountPinBoxFill className="w-7 h-7" />
            </div>
          </div>
          {/* <div
            onClick={() => {
              if (!currentChannel) {
                createChannelModal?.onOpen();
              } else {
                router.push(`/create`);
              }
            }}
            className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <MdCreate className="w-7 h-7" />
            </div>
            <div className="leading-none text-base flex gap-5 items-center p-4 rounded-md justify-start md:hidden lg:flex font-semibold transition-all">
              Create
            </div>
          </div> */}
          <div
            onClick={() => {
              if (!currentChannel) {
                createChannelModal?.onOpen();
              } else {
                router.push(`/studio`);
              }
            }}
            className="flex flex-row justify-center  lg:justify-normal  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <FaPaintBrush className="w-7 h-7" />
            </div>
          </div>
          <div
            onClick={() => {
              if (!currentChannel) createChannelModal?.onOpen();
              else router.push("/studio/upload");
            }}
            className="flex flex-row justify-center  lg:justify-normal  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <BiSolidCloudUpload className="w-7 h-7" />
            </div>
          </div>
          <div className="pt-3">
            {subscribedChannels.map((subscribedChannels) => {
              return (
                <MenuItems
                  channel={subscribedChannels}
                  key={subscribedChannels.id}
                  logo={
                    <Avatar
                      imageSrc={subscribedChannels.imageSrc}
                      size={AvatarSize.extra}
                    />
                  }
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col">
            <span className="lg:text-md md:hidden font-bold usespan mb-2">
              Please Sign In
            </span>
            <div className="flex justify-center items-center ml-5 mt-5">
              <SignInButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftBar;
