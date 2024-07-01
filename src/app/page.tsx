"use client";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";
import useSWR from "swr"; // Import useSWR from SWR library
import { Channel, Video } from "@prisma/client";
import axios from "axios";
import { SkeletonCard } from "@/components/Sketon";
import { SkeletonDemo } from "@/components/shared/Trop";

// Lazy load components
const LeftBar = lazy(() => import("@/components/Leftbar"));
const VideoCard = lazy(() => import("@/components/shared/VideoCard"));

interface VideoWithChannel extends Video {
  channel: Channel;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const Home = () => {
  const [subscriptions, setSubscriptions] = useState<Channel[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const observer = useRef<IntersectionObserver>();

  // Use SWR for fetching trending videos
  const { data: trendingVideos, error: trendingError } = useSWR<
    VideoWithChannel[]
  >(`/api/hello?offset=${offset}&limit=${limit}`, fetcher);

  // Use SWR for fetching subscriptions
  const { data: subs, error: subsError } = useSWR<Channel[]>(
    "/api/sub",
    fetcher
  );

  useEffect(() => {
    if (subsError) {
      console.error("Failed to fetch subscriptions", subsError);
    } else if (subs) {
      setSubscriptions(subs);
    }
  }, [subs, subsError]);

  const lastVideoElementRef = useCallback(
    (node: any) => {
      if (!trendingVideos || trendingVideos.length === 0) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          trendingVideos.length >= offset + limit
        ) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [trendingVideos, offset]
  );

  // Function to load more videos when reaching the bottom
  const loadMoreVideos = () => {
    if (trendingVideos && trendingVideos.length >= offset + limit) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  // Attach event listener for scrolling to load more videos
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      loadMoreVideos();
    }
  };

  return (
    <Suspense fallback={"loading"}>
      <div className="w-full relative mt-16 flex md:flex-row lg:flex-row">
        <div className="hidden md:flex">
          <LeftBar subscribedChannels={subscriptions} />
        </div>
        <div className="flex-1 grid-container gap-4 p-4">
          {trendingVideos ? (
            <>
              {trendingVideos.map((trendingVideo, index) => (
                <div
                  key={trendingVideo.id}
                  ref={
                    index === trendingVideos.length - 1
                      ? lastVideoElementRef
                      : undefined
                  }
                >
                  <VideoCard
                    video={trendingVideo}
                    channel={trendingVideo.channel}
                    channelAvatar={trendingVideo.channel.imageSrc}
                  />
                </div>
              ))}
              {trendingVideos.length === 0 && !trendingError && "No Videos"}
            </>
          ) : (
            <SkeletonCard />
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
