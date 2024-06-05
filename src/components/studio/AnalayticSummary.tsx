"use client";

import { CurrentChannelContext } from "@/context/CreateChannelContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoutes";
import { Video } from "@prisma/client";
import { useContext, useMemo } from "react";
import Avatar, { AvatarSize } from "../Avatar";
import AnalayticSummaryItem from "./AnalayticSummaryItem";
import { compactNumberFormat } from "@/utils/numUtils";
import Image from "next/image";

interface AnalayticSummaryProps {
  videos: Video[];
}

const AnalayticSummary: React.FC<AnalayticSummaryProps> = ({ videos }) => {
  useProtectedRoute();

  const currentChannel = useContext(CurrentChannelContext);

  const viewCount = useMemo(
    () =>
      videos?.reduce((totalViews, video) => totalViews + video.viewCount, 0),
    [videos]
  );
  return (
    <>
      <div className="sm:mx-auto flex items-center justify-center gap-4 mt-12">
        <div className="flex justify-center">
          <AnalayticSummaryItem
            value={compactNumberFormat(currentChannel?.subscriberCount)}
            subtitle="Followers"
          />
          <AnalayticSummaryItem
            value={compactNumberFormat(viewCount)}
            subtitle="Watcher"
          />
          <AnalayticSummaryItem
            value={compactNumberFormat(videos.length)}
            subtitle="Videos"
          />
        </div>
      </div>
    </>
  );
};

export default AnalayticSummary;
