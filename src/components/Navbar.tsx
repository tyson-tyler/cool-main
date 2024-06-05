"use client";

import Input from "./Input";
import Logo from "./Logo";
import UserOptions from "./UserOptions/UserOptions";
import Sidebar from "./sidebar/Sidebar";

export const Navbar = () => {
  return (
    <nav className="h-16 w-full fixed top-0 z-[60] bg-white shadow-lg text-black dark:bg-gray-950 border-b dark:border-gray-700 dark:text-white flex justify-between items-center">
      <Logo />
      <Input />
      <UserOptions />
    </nav>
  );
};
