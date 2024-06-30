"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";
import axios from "axios"; // Import Axios for fetching data
import { Channel, Video } from "@prisma/client";
import { SkeletonCard } from "@/components/Sketon";
import { SkeletonDemo } from "@/components/shared/Trop";

// Lazy load components
const LeftBar = lazy(() => import("@/components/Leftbar"));
const VideoCard = lazy(() => import("@/components/shared/VideoCard"));

interface VideoWithChannel extends Video {
  channel: Channel;
}

const Home = () => {
  const [trendingVideos, setTrendingVideos] = useState<VideoWithChannel[]>([]);
  const [subscriptions, setSubscriptions] = useState<Channel[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

  const fetchTrendingVideos = useCallback(
    async (offset: number, limit: number) => {
      try {
        const response = await axios.get(
          `/api/hello?offset=${offset}&limit=${limit}`
        ); // Using Axios for fetching data
        const videos = response.data;
        setTrendingVideos((prevVideos) => [...prevVideos, ...videos]);
        setHasMore(videos.length === limit);
      } catch (error) {
        console.error("Failed to fetch trending videos", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchSubscriptions = useCallback(async () => {
    try {
      const response = await axios.get("/api/sub"); // Example endpoint for subscriptions
      const subs = response.data;
      setSubscriptions(subs);
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchTrendingVideos(0, limit);
    fetchSubscriptions();
  }, [fetchTrendingVideos, fetchSubscriptions]);

  useEffect(() => {
    if (offset === 0) return;
    setLoading(true);
    fetchTrendingVideos(offset, limit);
  }, [offset, fetchTrendingVideos]);

  const lastVideoElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="w-full relative mt-16 flex md:flex-row lg:flex-row">
      <div className="hidden md:flex">
        <LeftBar subscribedChannels={subscriptions} />
      </div>
      <div className="flex-1 grid-container gap-4 p-4">
        {trendingVideos.length > 0
          ? trendingVideos.map((trendingVideo, index) => {
              if (trendingVideos.length === index + 1) {
                return (
                  <div ref={lastVideoElementRef}>
                    <VideoCard
                      video={trendingVideo}
                      channel={trendingVideo.channel}
                      channelAvatar={trendingVideo.channel.imageSrc}
                    />
                  </div>
                );
              } else {
                return (
                  <VideoCard
                    video={trendingVideo}
                    channel={trendingVideo.channel}
                    channelAvatar={trendingVideo.channel.imageSrc}
                  />
                );
              }
            })
          : !loading && "No Videos"}
        {loading && <SkeletonCard />}
      </div>
    </div>
  );
};

export default Home;
