"use client";

import React, { createContext, useState } from "react";
type SidebarState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const SidebarContextContext = createContext<SidebarState | null>(null);

const SidebarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContextContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </SidebarContextContext.Provider>
  );
};
export default SidebarProvider;
