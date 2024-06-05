"use client";

import { SidebarContextContext } from "@/context/SidebarContext";
import { Channel } from "@prisma/client";
import { useContext } from "react";
import { Navbar } from "../Navbar";

interface SidebarProps {
  subscribedChannels: Channel[];
}
const Sidebar: React.FC<SidebarProps> = ({ subscribedChannels }) => {
  const sidebar = useContext(SidebarContextContext);
  return (
    <>
      {sidebar?.isOpen && (
        <div
          className={` bg-opacity-50 h-screen w-screen fixed z-30`}
          onClick={() => sidebar.onClose()}
        />
      )}
      <div
        className={`fixed w-64 dark:bg-gray-800 z-40 mt-2 px-6 flex flex-col h-screen overflow-scroll no-scrollbar ${
          sidebar?.isOpen ? "translate-x-0" : "-translate-x-full"
        } ease-in-out duration-300`}
      >
        <Navbar />
      </div>
    </>
  );
};

export default Sidebar;
