"use client";

import { createContext, useState, ReactNode, FC } from "react";

interface UpdateProfileModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const UpdateProfileModalContext =
  createContext<UpdateProfileModalContextProps | null>(null);

export const UpdateProfileModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <UpdateProfileModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </UpdateProfileModalContext.Provider>
  );
};
