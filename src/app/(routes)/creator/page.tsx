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
import { SkeletonCard } from "@/components/Sketon";
import Loader from "@/components/Loader";
import axios from "axios"; // Import Axios for making HTTP requests

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
  const limit = 2; // Adjust this limit based on your preference
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

  const fetchTrendingVideos = async (offset: number, limit: number) => {
    try {
      const response = await axios.get(
        `/api/pure?offset=${offset}&limit=${limit}`
      );
      const videos = response.data;
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
      const response = await axios.get("/api/sub"); // Adjust the endpoint if necessary
      const subs = response.data;
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
      if (loading || !hasMore) return;
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
    <div className="w-full relative mt-16 flex justify-center">
      <div className="sm:hidden md:flex flex flex-between md:mr-4">
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <LeftBar subscribedChannels={subscriptions} />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="lg:basis-[85%] basis-[95%] sm:mb-[100px] lg:mb-[0px] gap-x-10 gap-y-10 mt-5 justify-center grid-container lg:mr-5">
          {trendingVideos.length > 0
            ? trendingVideos.map((trendingVideo, index) => (
                <div
                  ref={
                    index === trendingVideos.length - 1
                      ? lastVideoElementRef
                      : undefined
                  }
                  key={trendingVideo.id}
                >
                  <VideoCard
                    video={trendingVideo}
                    channel={trendingVideo.channel}
                    channelAvatar={trendingVideo.channel.imageSrc}
                  />
                </div>
              ))
            : !loading && "No Videos"}
          {loading && <SkeletonCard />}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
