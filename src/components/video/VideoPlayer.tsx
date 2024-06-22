"use client";
import React, { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Video } from "@prisma/client";
import { SkeletonCard } from "../skill";

interface VideoPlayerProps {
  videoSrc: string;
  userId: string;
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  userId,
  video,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleOnLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full flex justify-center lg:h-[600px] md:h-[500px] sm:h-[400px] h-[280px]  rounded-md   m-auto group dark:bg-black bg-white">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <SkeletonCard />
        </div>
      )}
      <div className="dark:text-white text-black z-40 w-full dark:bg-black bg-white">
        <MuxPlayer
          playback-id={videoSrc}
          src={videoSrc}
          theme="classic"
          autoPlay
          streamType="on-demand"
          metadata-video-title="Test VOD"
          title={`${video.title}`}
          metadata-viewer-user-id={userId}
          className="lg:h-[600px] md:h-[500px] sm:h-[400px] h-[280px] w-full rounded-md dark:bg-black bg-white"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
