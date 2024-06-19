"use client";
import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

  // Simulating loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simulate loading complete after 2 seconds
    }, 2);

    return () => clearTimeout(timer); // Clean up timeout on unmount
  }, []);

  return (
    <div className="relative w-full flex justify-center m-auto group dark:bg-black">
      <div className="dark:text-white text-black z-40 w-full">
        {loading ? (
          <div className="flex items-center justify-center h-[280px] w-full">
            <SkeletonCard />
          </div>
        ) : (
          <MuxPlayer
            playback-id={videoSrc}
            src={videoSrc}
            theme="classic"
            autoPlay
            streamType="on-demand"
            metadata-video-title="Test VOD"
            title={`${video.title}`}
            metadata-viewer-user-id={userId}
            className="lg:h-[600px] md:h-[500px] sm:h-[400px] h-[280px] w-full rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
