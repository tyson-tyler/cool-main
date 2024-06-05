"use client";

import { useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  videoSrc: string;
  userId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, userId }) => {
  useEffect(() => {
    const recordWatchHistory = async () => {
      try {
        await fetch("/api/history/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, videoId: videoSrc }),
        });
      } catch (error) {
        console.error("Failed to record watch history:", error);
      }
    };

    recordWatchHistory();
  }, [videoSrc, userId]);

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
