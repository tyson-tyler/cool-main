import getChannelById from "@/actions/getChannelById";
import getCommentsByVideoId from "@/actions/getCommentsByVideoId";
import { getRecommendedVideos } from "@/actions/getRecommendedVideos";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";

import { Metadata } from "next";
import { Suspense } from "react";
import { BiComment } from "react-icons/bi";

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

  // Dynamically import components
  const SheetDemo = (await import("@/components/he")).SheetDemo;
  const VideoCard = (await import("@/components/shared/VideoCard")).default;
  const SkeletonCard = (await import("@/components/skill")).SkeletonCard;
  const { Dialog, DialogContent, DialogTrigger } = await import(
    "@/components/ui/dialog"
  );
  const { Button } = await import("@/components/ui/button");
  const CommentSection = (
    await import("@/components/video/CommentSection/CommentSection")
  ).default;
  const Description = (await import("@/components/video/Description")).default;
  const LikeSubscribePage = (
    await import("@/components/video/LikeSubscribePage/LikeSubscribePage")
  ).default;
  const VideoPlayer = (await import("@/components/video/VideoPlayer")).default;

  // Fetch data
  const video = await increaseVideoViewCount({ videoId });
  const channel = await getChannelById({ channelId: video?.channelId });
  const comments = await getCommentsByVideoId({ videoId });
  const recommendedVideos = await getRecommendedVideos({ video });

  return video && channel && comments ? (
    <>
      {/* Your JSX remains mostly the same */}
      <div className="w-full relative mt-16 flex justify-center">
        <div className="w-full flex flex-col gap-4">
          <div className="sm:hidden absolute top-1 z-[50] md:flex flex flex-between md:mr-4 ml-4">
            <SheetDemo />
          </div>

          <VideoPlayer
            video={video}
            userId={channel.userId}
            videoSrc={video.videoSrc}
          />

          {/* Rest of your components */}
          <div className="mx-2">
            <div>
              <LikeSubscribePage video={video} channel={channel} />
              <div className="flex justify-center w-full mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="md:ml-[60px] lg:ml-[60px]"
                    >
                      <BiComment className="w-5 h-5 mr-2" />
                      Comment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <CommentSection comments={comments} videoId={video.id} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <h1 className="text-2xl my-2 pb-2 font-semibold break-all dark:text-white text-black">
              {video.title}
              <Description video={video} />
            </h1>
          </div>

          <div className="w-full grid-container gap-4 px-2 lg:px-7">
            <Suspense fallback={<SkeletonCard />}>
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
            </Suspense>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Video not found</h1>
  );
}
