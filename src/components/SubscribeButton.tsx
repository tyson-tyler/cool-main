"use client";

import { useState } from "react";
import UseSubscribe from "@/hooks/useSubscribe";
import { Button } from "./ui/button";
import Loader from "./Loader";

interface SubscribeButtonProps {
  channelId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ channelId }) => {
  const { hasSubcribed, toogleSubscribed } = UseSubscribe({ channelId });
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toogleSubscribed();
    } catch (error) {
      console.error("Error toggling subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={hasSubcribed ? "outline" : "default"}
      onClick={handleToggle}
      className="p-4 hover:opacity-75 w-1/2 md:w-1/3 lg:w-1/5 md:mt-3 lg:mt-0 px-[50px]"
      disabled={loading}
    >
      {loading ? <Loader /> : hasSubcribed ? "Followed" : "Follow"}
    </Button>
  );
};

export default SubscribeButton;
