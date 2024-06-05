"use client";

import { PiFolderUser, PiSignOut } from "react-icons/pi";
import MenuItem from "./MenuItem";
import { MdAccountCircle } from "react-icons/md";
import { Brush, Videotape } from "lucide-react";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./Modetoogle";
import { useContext } from "react";
import { CreateChannelModalContext } from "@/context/CreateChannelModelContext";
import { CurrentChannelContext } from "@/context/CreateChannelContext";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onClose }) => {
  const createChannelModal = useContext(CreateChannelModalContext);
  const router = useRouter();

  const currentChannel = useContext(CurrentChannelContext);
  const handleUploadClick = () => {
    if (!currentChannel) createChannelModal?.onOpen();
    else router.push("/studio/upload");
  };
  return (
    <>
      <div
        className="h-screen w-screen fixed z-50 transition-all"
        onClick={onClose}
      />

      <div className="absolute p-3 rounded-md shadow-md w-60 right-2 top-16 text-sm flex flex-col overflow-hidden z-50 transition-all dark:bg-gray-900 bg-white">
        <div className="w-full dark:bg-gray-900 bg-white justify-around pl-2 items-center">
          <ModeToggle />
          <span className="text-center font-semibold ml-4 mb-2">Mode</span>
        </div>
        <MenuItem
          logo={<MdAccountCircle className="w-7 h-7 mr-4" />}
          label="Channel"
          onClick={() => {
            if (!currentChannel) {
              createChannelModal?.onOpen();
            } else {
              router.push(`/channel/${currentChannel.id}`);
            }

            onClose();
          }}
        />
        <MenuItem
          logo={<Brush className="w-7 h-7 mr-4" />}
          label="Studio"
          onClick={() => {
            if (!currentChannel) {
              createChannelModal?.onOpen();
            } else {
              router.push(`/studio`);
            }
            onClose();
          }}
        />
        <MenuItem
          logo={<Videotape className="w-7 h-7 mr-4" />}
          label="Create Video"
          onClick={handleUploadClick}
        />
        <MenuItem
          logo={<PiSignOut className="w-7 h-7 mr-4" />}
          label="Sign out"
          onClick={() => {
            signOut();
            onClose();
          }}
        />
      </div>
    </>
  );
};

export default UserMenu;
