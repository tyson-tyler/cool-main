"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";
import useSWR from "swr"; // Import SWR for data fetching
import axios from "axios";
import { Channel, Video } from "@prisma/client";
import { SkeletonCard } from "@/components/Sketon";
import { SkeletonDemo } from "@/components/shared/Trop";

const LeftBar = lazy(() => import("@/components/Leftbar"));
const VideoCard = lazy(() => import("@/components/shared/VideoCard"));

interface VideoWithChannel extends Video {
  channel: Channel;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Home = () => {
  const [trendingVideos, setTrendingVideos] = useState<VideoWithChannel[]>([]);
  const [subscriptions, setSubscriptions] = useState<Channel[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

  const { data: initialVideos, error: videosError } = useSWR(
    `/api/hello?offset=0&limit=${limit}`,
    fetcher
  );
  const { data: initialSubscriptions, error: subscriptionsError } = useSWR(
    "/api/sub",
    fetcher
  );

  useEffect(() => {
    if (initialVideos) {
      setTrendingVideos(initialVideos);
      setHasMore(initialVideos.length === limit);
      setLoading(false);
    }
  }, [initialVideos]);

  useEffect(() => {
    if (initialSubscriptions) {
      setSubscriptions(initialSubscriptions);
    }
  }, [initialSubscriptions]);

  const fetchMoreVideos = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/pure?offset=${offset}&limit=${limit}`
      );
      const videos = response.data;
      setTrendingVideos((prevVideos) => [...prevVideos, ...videos]);
      setHasMore(videos.length === limit);
    } catch (error) {
      console.error("Failed to fetch more videos", error);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    if (offset > 0) {
      setLoading(true);
      fetchMoreVideos();
    }
  }, [offset, fetchMoreVideos]);

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

  if (videosError) return <div>Failed to load videos</div>;
  if (subscriptionsError) return <div>Failed to load subscriptions</div>;

  return (
    <div className="w-full relative mt-16 flex md:flex-row lg:flex-row">
      <div className="hidden md:flex">
        <Suspense fallback={<SkeletonDemo />}>
          <LeftBar subscribedChannels={subscriptions} />
        </Suspense>
      </div>
      <div className="flex-1 grid-container gap-4 p-4">
        {trendingVideos.length > 0
          ? trendingVideos.map((trendingVideo, index) => {
              if (trendingVideos.length === index + 1) {
                return (
                  <div ref={lastVideoElementRef} key={trendingVideo.id}>
                    <Suspense fallback={<SkeletonCard />}>
                      <VideoCard
                        video={trendingVideo}
                        channel={trendingVideo.channel}
                        channelAvatar={trendingVideo.channel.imageSrc}
                      />
                    </Suspense>
                  </div>
                );
              } else {
                return (
                  <Suspense fallback={<SkeletonCard />} key={trendingVideo.id}>
                    <VideoCard
                      video={trendingVideo}
                      channel={trendingVideo.channel}
                      channelAvatar={trendingVideo.channel.imageSrc}
                    />
                  </Suspense>
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
