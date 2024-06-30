import getCurrentSubscription from "@/actions/getCurrentSubscriptions";
import LeftBar from "@/components/Leftbar";
import React from "react";
import UploadPage from "../studio/upload/page";

const Pan = async () => {
  const subscriptions = await getCurrentSubscription();
  return (
    <div className="flex w-full">
      <div className="sm:hidden border-r border-gray-500 md:flex flex flex-between md:mr-0 mt-12 md:ml-5 lg:ml-0">
        <LeftBar subscribedChannels={subscriptions} />
      </div>
      <UploadPage />
    </div>
  );
};

export default Pan;
