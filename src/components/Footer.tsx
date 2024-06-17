"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";

import { CurrentChannelContext } from "@/context/CreateChannelContext";
import { useRouter } from "next/navigation";
import { CreateChannelModalContext } from "@/context/CreateChannelModelContext";
import { SiHomeadvisor } from "react-icons/si";
import { BiSolidCloudUpload, BiSolidParty } from "react-icons/bi";
import { GiFilmSpool } from "react-icons/gi";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { FaPaintBrush } from "react-icons/fa";
import { FaGrinHearts } from "react-icons/fa";

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
        <div className="flex gap-5 ml-3">
          <div
            onClick={() => {
              router.push("/");
            }}
            className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <SiHomeadvisor className="w-7 h-7" />
            </div>
          </div>
          <div
            onClick={() => {
              router.push("/creator");
            }}
            className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <BiSolidParty className="w-7 h-7" />
            </div>
          </div>
          <div
            onClick={() => {
              router.push("/shorts");
            }}
            className="flex flex-row  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <GiFilmSpool className="w-7 h-7" />
            </div>
          </div>
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
                router.push(`/like`);
              }
            }}
            className="flex flex-row justify-center  lg:justify-normal  cursor-pointer items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              <FaGrinHearts className="w-7 h-7" />
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
