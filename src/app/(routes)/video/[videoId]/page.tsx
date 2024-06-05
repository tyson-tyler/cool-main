import getChannelById from "@/actions/getChannelById";
import getCommentsByVideoId from "@/actions/getCommentsByVideoId";
import getCurrentSubscription from "@/actions/getCurrentSubscriptions";
import { getRecommendedVideos } from "@/actions/getRecommendedVideos";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";
import { SheetDemo } from "@/components/he";

import VideoCard from "@/components/shared/VideoCard";
import CommentSection from "@/components/video/CommentSection/CommentSection";
import Description from "@/components/video/Description";
import LikeSubscribePage from "@/components/video/LikeSubscribePage/LikeSubscribePage";
import VideoPlayer from "@/components/video/VideoPlayer";
import { Metadata } from "next";

interface VideoPageProps {
  videoId?: string;
}

export async function generateMetadata({
  params,
}: {
  params: VideoPageProps;
}): Promise<Metadata> {
  const { videoId } = params;
  const video = await increaseVideoViewCount({ videoId });

  return {
    title: video?.title,
  };
}

export default async function VideoPage({
  params,
}: {
  params: VideoPageProps;
}) {
  const { videoId } = params;

  const video = await increaseVideoViewCount({ videoId });
  const channel = await getChannelById({ channelId: video?.channelId });
  const subscriptions = await getCurrentSubscription();
  const comments = await getCommentsByVideoId({
    videoId,
  });
  const recommendedVideos = await getRecommendedVideos({ video });

  return video && channel && comments ? (
    <>
      <div className="w-full relative  mt-16 flex justify-center">
        <div className="w-full flex flex-col gap-4">
          <div className="sm:hidden absolute top-1 z-[50] md:flex flex flex-between md:mr-4 ml-4">
            <SheetDemo />
          </div>
          <VideoPlayer userId={channel.userId} videoSrc={video.videoSrc} />
          <div className="mx-2">
            <LikeSubscribePage video={video} channel={channel} />
            <h1 className="text-2xl my-2 pb-2 font-semibold break-all dark:text-white text-black">
              {video.title}
              <Description video={video} />
            </h1>

            <div className="w-full grid-container gap-4 pb-4">
              {recommendedVideos
                ? recommendedVideos.map((recommendedVideo) => {
                    return (
                      <VideoCard
                        key={recommendedVideo.id}
                        video={recommendedVideo}
                        channel={recommendedVideo.channel}
                        channelAvatar={channel.imageSrc}
                      />
                    );
                  })
                : null}
            </div>
            <CommentSection comments={comments} videoId={video.id} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>video not found</h1>
  );
}
