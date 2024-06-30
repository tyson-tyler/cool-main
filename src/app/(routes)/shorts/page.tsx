"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Channel, Video } from "@prisma/client";
import { SkeletonCard } from "@/components/skill";
import { FilmIcon, Loader } from "lucide-react";

// Lazy load components
const LeftBar = lazy(() => import("@/components/Sidbar"));
const VideoCard = lazy(() => import("@/components/videoTrue"));
const Bar = lazy(() => import("@/components/Bar"));

interface VideoWithChannel extends Video {
  channel: Channel;
}

const Home = () => {
  const [trendingVideos, setTrendingVideos] = useState<VideoWithChannel[]>([]);
  const [subscriptions, setSubscriptions] = useState<Channel[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 3; // Adjust this limit based on your preference
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

  const fetchTrendingVideos = async (offset: number, limit: number) => {
    try {
      const response = await fetch(
        `/api/hello?offset=${offset}&limit=${limit}`
      );
      const videos = await response.json();
      setTrendingVideos((prevVideos) => [...prevVideos, ...videos]);
      setHasMore(videos.length === limit);
    } catch (error) {
      console.error("Failed to fetch trending videos", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/sub"); // Adjust the endpoint if necessary
      const subs = await response.json();
      setSubscriptions(subs);
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
    }
  };

  useEffect(() => {
    setLoading(true);
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
    <div className="w-full relative mt-16 flex justify-around lg:justify-between">
      <div className="sm:hidden md:flex flex flex-between md:mr-4">
        <Suspense fallback={<div>Loading left bar...</div>}>
          <LeftBar subscribedChannels={subscriptions} />
        </Suspense>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center mt-3 mb-10 items-center">
          <FilmIcon className="w-10 h-10" />
          <span className="text-sm sm:text-sm md:text-lg lg:text-xl font-bold ml-3">
            Ai Films
          </span>
        </div>
        <Suspense
          fallback={
            <div>
              <Loader className="w-5 h-5 animate-spin" />
            </div>
          }
        >
          <div className="basis-[85%] mb-[100px] lg:mb-[0px] gap-x-10 gap-y-10 mt-5 justify-center">
            {trendingVideos.length > 0
              ? trendingVideos.map((trendingVideo, index) => {
                  if (trendingVideos.length === index + 1) {
                    return (
                      <div ref={lastVideoElementRef} key={trendingVideo.id}>
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
              : !loading && "No Videos"}
            {loading && <SkeletonCard />}
          </div>
        </Suspense>
      </div>
      <div className="sm:hidden lg:flex flex flex-between md:mr-4 md:hidden">
        <Suspense
          fallback={
            <div>
              {" "}
              <Loader className="w-5 h-5 animate-spin" />
            </div>
          }
        >
          <Bar />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
