// components/VideoPlayer.tsx
"use client";
import { useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { Video } from "@prisma/client";
import { getSession } from "next-auth/react";
import getCurrentUser from "@/actions/getCurrentUser"; // Import getCurrentUser function

interface VideoPlayerProps {
  videoSrc: string;
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, video }) => {
  useEffect(() => {
    const updateWatchHistory = async () => {
      try {
        const session = await getSession();
        if (!session?.user?.email) {
          throw new Error("User is not authenticated");
        }

        // Fetch current user to get userId
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          throw new Error("Failed to get current user");
        }

        const response = await fetch("/api/watch-history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: video.id, userId: currentUser.id }), // Pass userId to API
        });

        if (!response.ok) {
          throw new Error("Failed to update watch history");
        }

        console.log(
          `Added ${video.title} to watch history for user ${currentUser.id}`
        );
      } catch (error) {
        console.error("Error updating watch history:", error);
      }
    };

    updateWatchHistory();
  }, []);

  return (
    <div className="relative w-full flex justify-center m-auto group dark:bg-black">
      <div className="dark:text-white text-black z-40 w-full">
        <MuxPlayer
          playback-id={videoSrc}
          src={videoSrc}
          theme="classic"
          autoPlay
          streamType="on-demand"
          metadata-video-title={video.title} // Set video title dynamically
          title={video.title} // Set video title dynamically
          className="lg:h-[600px] md:h-[500px] sm:h-[400px] h-[280px] w-full rounded-md"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
