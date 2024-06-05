"use client";

import React, { createContext, useState } from "react";
type ModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const UploadVideoModeContext = createContext<ModalState | null>(null);

const UploadVideoModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <UploadVideoModeContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </UploadVideoModeContext.Provider>
  );
};
export default UploadVideoModalProvider;
