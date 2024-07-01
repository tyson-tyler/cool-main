"use client";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";
import useSWR from "swr";
import { Channel, Video } from "@prisma/client";
import axios from "axios"; // Import Axios for fetching data
import { SkeletonCard } from "@/components/Sketon";
import { SkeletonDemo } from "@/components/shared/Trop";

// Lazy load components
const LeftBar = lazy(() => import("@/components/Leftbar"));
const VideoCard = lazy(() => import("@/components/shared/VideoCard"));

interface VideoWithChannel extends Video {
  channel: Channel;
}

const Home = () => {
  const {
    data: trendingVideos,
    error,
    mutate,
  } = useSWR<VideoWithChannel[]>(
    `/api/hello?offset=0&limit=10`, // Initial fetch URL
    async (url: any) => {
      const response = await axios.get(url);
      return response.data;
    }
  );

  const { data: subscriptions } = useSWR<Channel[]>(
    "/api/sub",
    async (url: any) => {
      const response = await axios.get(url);
      return response.data;
    }
  );

  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (trendingVideos) {
      setHasMore(trendingVideos.length === limit);
      setLoading(false);
    }
  }, [trendingVideos]);

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

  useEffect(() => {
    setLoading(true);
    mutate();
  }, [offset, mutate]);

  return (
    <div className="w-full relative mt-16 flex md:flex-row lg:flex-row">
      <div className="hidden md:flex">
        <LeftBar subscribedChannels={subscriptions || []} />
      </div>
      <div className="flex-1 grid-container gap-4 p-4">
        {trendingVideos && trendingVideos.length > 0
          ? trendingVideos.map((trendingVideo, index) => {
              if (trendingVideos.length === index + 1) {
                return (
                  <div key={trendingVideo.id} ref={lastVideoElementRef}>
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
                    key={trendingVideo.id}
                    video={trendingVideo}
                    channel={trendingVideo.channel}
                    channelAvatar={trendingVideo.channel.imageSrc}
                  />
                );
              }
            })
          : !loading && <div>No Videos</div>}
        {loading && <SkeletonCard />}
      </div>
    </div>
  );
};

export default Home;
