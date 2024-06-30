import getChannelById from "@/actions/getChannelById";
import getCurrentSubscription from "@/actions/getCurrentSubscriptions";
import getVideosByChannelId from "@/actions/getVideosByChannelId";
import LeftBar from "@/components/second";
import ChannelHeader from "@/components/channel/ChannelHeader";
import VideoTrack from "@/components/videotrack";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ChannelPageProps {
  channelId: string;
}

export default async function ChannelPage({
  params,
}: {
  params: ChannelPageProps;
}) {
  const { channelId } = params;
  const channel = await getChannelById({ channelId });
  const videos = await getVideosByChannelId({ channelId });
  const subscriptions = await getCurrentSubscription();

  return channel ? (
    <>
      <div className="flex">
        <div className="sm:hidden md:flex flex flex-between md:mr-0 mt-12 md:ml-5 lg:ml-0">
          <LeftBar subscribedChannels={subscriptions} />
        </div>

        <div className="flex ml-0 flex-col lg:ml-5 w-full">
          <div>
            <div className="flex flex-col">
              <ChannelHeader channel={channel} videoCount={videos.length} />

              <div className="border-b-2 border-b-gray-500">
                <div className="text-center py-2 w-full mx-auto border-b-neutral-200">
                  Videos
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 px-6 gap-4 flex flex-wrap justify-center items-center">
            {videos.length > 0 ? (
              videos.map((video) => <VideoTrack key={video.id} video={video} />)
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
    </>
  ) : (
    <h1>Channel not found</h1>
  );
}
