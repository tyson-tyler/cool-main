import getCurrentChannel from "@/actions/getCurrentChannel";
import getCurrentSubscription from "@/actions/getCurrentSubscriptions";
import getVideosByChannelId from "@/actions/getVideosByChannelId";

import LeftBar from "@/components/second";
import AnalayticSummary from "@/components/studio/AnalayticSummary";
import VideoDetailCard from "@/components/studio/VideoDetailCard";
import { Button } from "@/components/ui/button";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Studio",
  },
};

const page = async () => {
  const currentChannel = await getCurrentChannel();
  const subscriptions = await getCurrentSubscription();

  const videos = await getVideosByChannelId({ channelId: currentChannel?.id });
  return (
    <div className="w-full flex">
      <div className="sm:hidden border-r border-gray-500 md:flex flex flex-between md:mr-0 mt-12 md:ml-5 lg:ml-0">
        <LeftBar subscribedChannels={subscriptions} />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center mt-40">
          <Image
            src={`${currentChannel?.imageSrc}`}
            width={80}
            height={80}
            className=""
            alt="hello"
          />
        </div>
        <div className="flex flex-col w-full h-full">
          <AnalayticSummary videos={videos} />

          <div className="flex flex-col gap-4 mt-8">
            <h2 className="text-2xl text-center font-semibold">Videos</h2>
            <div className="py-5 grid-container">
              {videos.length ? (
                videos.map((video) => {
                  return <VideoDetailCard key={video.id} video={video} />;
                })
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={"/logo/em.svg"}
                    width={100}
                    height={100}
                    alt="hello"
                    className="mt-20"
                  />
                  <span className="font-semibold text-black dark:text-white p-4">
                    No Video
                  </span>
                  <Link href={`/studio/upload`}>
                    <Button size={"lg"} className="p-3">
                      Create Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
