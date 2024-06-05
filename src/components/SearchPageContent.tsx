"use client";
import { Channel, Video } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import Image from "next/image";
import VideoCard from "./shared/VideoCard";
import { SkeletonCard } from "./Sketon";

export default function SearchPageContent() {
  const params = useSearchParams();
  const searchQuery = params.get("searchQuery");
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<(Video & { channel: Channel })[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const cachedData = sessionStorage.getItem("searchResults");
        if (cachedData) {
          setVideos(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const { data } = await axios.get("/api/videos", {
            params: { searchQuery },
          });
          setVideos(data);
          sessionStorage.setItem("searchResults", JSON.stringify(data));
          setLoading(false);
        }
      } catch (error) {
        toast.error("Failed to fetch videos");
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchVideos();
    }

    return () => {
      // Clear cache on component unmount
      sessionStorage.removeItem("searchResults");
    };
  }, [searchQuery]);

  return (
    <div className="w-full relative mt-16 flex justify-center">
      <div className="basis-[85%] sm:mb-[100px] lg:mb-[0px] gap-x-10 gap-y-10 mt-5 justify-center grid-container w-full">
        {loading ? (
          <div className="w-full h-screen justify-center flex items-center">
            <div className="flex justify-center items-center">
              <span className="usespan text-xl">
                <SkeletonCard />
              </span>
            </div>
          </div>
        ) : videos.length ? (
          videos.map((video) => (
            <VideoCard key={video.id} video={video} channel={video.channel} />
          ))
        ) : (
          <div className="w-full h-fit justify-center flex items-center flex-col">
            <div className="flex justify-center items-center flex-col">
              <Image
                width={250}
                height={250}
                src={"/oops.png"}
                alt="log"
                className="object-cover"
              />
              <span className="usespan text-xl font-semibold">
                No videos found
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
