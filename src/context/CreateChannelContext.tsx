"use client";

import { Channel } from "@prisma/client";
import { createContext } from "react";

export const CurrentChannelContext = createContext<Channel | null>(null);

interface CurrentChannelProviderProps {
  Channel: Channel | null;
}

const CurrentChannelProvider: React.FC<
  React.PropsWithChildren<CurrentChannelProviderProps>
> = ({ Channel, children }) => {
  return (
    <CurrentChannelContext.Provider value={Channel}>
      {children}
    </CurrentChannelContext.Provider>
  );
};

export default CurrentChannelProvider;
