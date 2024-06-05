"use client";
import React from "react";
import { Channel, Video } from "@prisma/client";
import VideoCard from "../shared/VideoCard";
import { useProtectedRoute } from "@/hooks/useProtectedRoutes";

interface SubscriptionListProps {
  videos: (Video & { channel: Channel })[];
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ videos }) => {
  useProtectedRoute({ checkChannel: false });

  return (
    <div className="mx-12 sm:mx-24 py-5 grid-container">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} channel={video.channel} />
      ))}
    </div>
  );
};

export default SubscriptionList;
