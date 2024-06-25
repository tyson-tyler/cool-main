"use client";

import { Channel, Video } from "@prisma/client";
import Link from "next/link";
import Avatar, { AvatarSize } from "./Avatar";
import { useRef, useState, useEffect } from "react";
import LikeDisLikeButton from "./LikeDisLikeButton";
import DialogDemo from "./Come";

interface VideoCardProps {
  channel?: Channel;
  channelAvatar?: string;
  video: Video;
  includeDescription?: boolean;
  isVertical?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  channel,
  video,
  includeDescription = false,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  const truncatedTitle =
    video.title.length > 20 ? video.title.slice(0, 20) + "..." : video.title;

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const playVideoOnFocus = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (videoRef.current) {
      if (entry.isIntersecting) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      observerRef.current = new IntersectionObserver(handleVisibilityChange, {
        threshold: 0.5, // Adjust this value to control how much of the video needs to be visible to start playing
      });
      observerRef.current.observe(videoRef.current);

      return () => {
        if (observerRef.current && videoRef.current) {
          observerRef.current.unobserve(videoRef.current);
        }
      };
    }
  }, []);

  return (
    <>
      <Link
        className="m-auto w-full block mt-13 mb-3"
        href={`/video/${video.id}`}
        prefetch={true}
      >
        <div className="relative w-full flex justify-center lg:justify-center lg:h-[550px] aspect-auto">
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center dark:bg-gray-500 bg-gray-400 rounded-md">
              <div className="loader"></div>
              {/* You can replace this with any placeholder you prefer */}
            </div>
          )}
          <video
            ref={videoRef}
            src={video.videoSrc}
            className={`object-fit dark:bg-gray-800 bg-gray-300 md:hover:scale-105 aspect-video rounded-md w-full max-w-[40rem] h-[400px] sm:h-[600px] lg:h-auto duration-150 transition-all ease-in ${
              videoLoaded ? "md:hover:scale-105" : ""
            }`}
            loop
            onLoadedData={handleVideoLoaded}
            key={video.id}
          />
        </div>
      </Link>
      <div className="flex gap-x-5 mt-[-30px] mb-15 flex-col justify-center items-center z-50 mb-40">
        {channel ? (
          <div className="flex gap-2 items-center z-[2] dark:bg-neutral-800 bg-gray-100 text-black dark:text-white rounded-full p-2">
            <div>
              <LikeDisLikeButton video={video} />
            </div>
            <Link href={`/channel/${channel.id}`}>
              <Avatar size={AvatarSize.medium} imageSrc={channel.imageSrc} />
            </Link>
            <div className="flex-col hidden sm:hidden lg:flex">
              <p className="text-gray-500 text-sm whitespace-nowrap">
                {channel.name}
              </p>
            </div>
            <div>
              <DialogDemo video={video} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default VideoCard;
