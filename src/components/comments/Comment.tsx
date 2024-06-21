import getChannelById from "@/actions/getChannelById";
import getCommentsByVideoId from "@/actions/getCommentsByVideoId";
import getCurrentSubscription from "@/actions/getCurrentSubscriptions";
import { getRecommendedVideos } from "@/actions/getRecommendedVideos";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";

import { SheetDemo } from "@/components/he";

import VideoCard from "@/components/shared/VideoCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CommentSection from "@/components/video/CommentSection/CommentSection";
import Description from "@/components/video/Description";
import LikeSubscribePage from "@/components/video/LikeSubscribePage/LikeSubscribePage";
import VideoPlayer from "@/components/video/VideoPlayer";
import { Metadata } from "next";
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

export default async function Comment({ params }: { params: VideoPageProps }) {
  const { videoId } = params;

  const video = await increaseVideoViewCount({ videoId });
  const channel = await getChannelById({ channelId: video?.channelId });

  const comments = await getCommentsByVideoId({
    videoId,
  });

  return video && channel && comments ? (
    <>
      <div className="flex justify-center w-full mt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="md:ml-[60px] lg:ml-[60px]">
              <BiComment className="w-5 h-5 mr-2" />
              Comment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <CommentSection comments={comments} videoId={video.id} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  ) : (
    <h1>video not found</h1>
  );
}
