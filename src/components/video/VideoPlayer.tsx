"use client";

import { useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  videoSrc: string;
  userId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, userId }) => {
  return (
    <div className="relative w-full flex justify-center m-auto group dark:bg-black">
      <div className="dark:text-white text-black z-40 w-full">
        <MuxPlayer
          playback-id={videoSrc}
          src={videoSrc}
          autoPlay
          accentColor="#ea580c"
          metadata-video-title="Test VOD"
          metadata-viewer-user-id={userId}
          className="lg:h-[600px] md:h-[500px] sm:h-[400px] h-[280px] w-full rounded-md"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
