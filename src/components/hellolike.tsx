"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import LeftBar from "@/components/Leftbar";
import VideoCard from "@/components/shared/VideoCard";
import { Suspense } from "react";
import { Channel, Video } from "@prisma/client";
import { SkeletonCard } from "@/components/Sketon";

interface VideoWithChannel extends Video {
  channel: Channel;
}

const Home = () => {
  const [likedVideos, setLikedVideos] = useState<VideoWithChannel[]>([]);
  const [trendingVideos, setTrendingVideos] = useState<VideoWithChannel[]>([]);
  const [subscriptions, setSubscriptions] = useState<Channel[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 2;
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [endOfVideos, setEndOfVideos] = useState(false);
  const observer = useRef<IntersectionObserver>();

  const fetchLikedVideos = async () => {
    try {
      const response = await fetch("/api/liked-videos");
      if (!response.ok) {
        throw new Error("Failed to fetch liked videos");
      }
      const data: VideoWithChannel[] = await response.json();
      setLikedVideos(data);
    } catch (error) {
      console.error("Error fetching liked videos:", error);
    }
  };

  const fetchTrendingVideos = async (offset: number, limit: number) => {
    try {
      const response = await fetch(
        `/api/hello?offset=${offset}&limit=${limit}`
      );
      const videos = await response.json();
      if (videos.length === 0) {
        setEndOfVideos(true);
      } else {
        setTrendingVideos((prevVideos) => [...prevVideos, ...videos]);
        setHasMore(videos.length === limit);
      }
    } catch (error) {
      console.error("Failed to fetch trending videos", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/sub");
      const subs = await response.json();
      setSubscriptions(subs);
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchLikedVideos();
    fetchTrendingVideos(0, limit); // Initial fetch
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    if (offset === 0) return;
    setLoading(true);
    fetchTrendingVideos(offset, limit); // Fetch more videos when offset changes
  }, [offset]);

  const lastVideoElementRef = useCallback(
    (node: any) => {
      if (loading || endOfVideos) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, endOfVideos]
  );

  return (
    <div className="w-full relative mt-16 flex justify-center">
      <div className="sm:hidden md:flex flex flex-between md:mr-4">
        <LeftBar subscribedChannels={subscriptions} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="lg:basis-[85%] basis-[95%] sm:mb-[100px] lg:mb-[0px] gap-x-10 gap-y-10 mt-5 justify-center grid-container lg:mr-5">
          {likedVideos.length > 0 && (
            <>
              {likedVideos.map((likedVideo, index) => (
                <div
                  ref={
                    index === likedVideos.length - 1
                      ? lastVideoElementRef
                      : undefined
                  }
                  key={likedVideo.id}
                >
                  <VideoCard
                    key={likedVideo.id}
                    video={likedVideo}
                    channel={likedVideo.channel}
                    channelAvatar={likedVideo.channel.imageSrc}
                  />
                </div>
              ))}
            </>
          )}

          {loading && ""}

          {endOfVideos && (
            <div className="text-center text-gray-500 mt-4">End of videos.</div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
