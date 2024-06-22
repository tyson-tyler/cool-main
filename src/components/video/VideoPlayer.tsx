"use client";

import MuxPlayer from "@mux/mux-player-react";
import { Video } from "@prisma/client";

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
  return (
    <div className="relative w-full flex justify-center m-auto group dark:bg-black">
      <div className="dark:text-white text-black z-40 w-full">
        <MuxPlayer
          playback-id={videoSrc}
          src={videoSrc}
          theme="classic"
          autoPlay
          streamType="on-demand"
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
