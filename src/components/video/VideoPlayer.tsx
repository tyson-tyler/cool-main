"use client";

import MuxPlayer from "@mux/mux-player-react";
import { Video } from "@prisma/client";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const player = document.querySelector("mux-player");

    const handleLoaded = () => {
      setIsLoading(false);
    };

    if (player) {
      player.addEventListener("loadeddata", handleLoaded);
    }

    return () => {
      if (player) {
        player.removeEventListener("loadeddata", handleLoaded);
      }
    };
  }, [videoSrc]);

  return (
    <div className="relative w-full flex justify-center m-auto group dark:bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="loader">Loading...</div>
        </div>
      )}
      <div className="dark:text-white text-black z-40 w-full">
        <MuxPlayer
          src={videoSrc}
          autoPlay
          metadata-video-title="Test VOD"
          title={`${video.title}`}
          metadata-viewer-user-id={userId}
          className="lg:h-[600px] md:h-[500px] sm:h-[400px] h-[380px] w-full rounded-md"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
