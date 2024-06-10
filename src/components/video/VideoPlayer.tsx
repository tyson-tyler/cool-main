"use client";

import { useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { CldVideoPlayer } from "next-cloudinary";

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
        <CldVideoPlayer
          playback-id={videoSrc}
          src={videoSrc}
          autoPlay
          className="lg:h-[600px] md:h-[500px] sm:h-[400px] h-[280px] w-full rounded-md"
          sourceTypes={["hls", "dash"]}
          transformation={{ streaming_profile: "hd" }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
