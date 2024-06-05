import { Channel, Video } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/vendor/db";

export default async function getSubscriptionVideos(): Promise<Video[]> {
  const currentUser = await getCurrentUser();

  try {
    if (!currentUser?.subscribedChannelIds) {
      throw new Error("User's subscribedChannelIds is not defined.");
    }

    const videos = await prisma.video.findMany({
      where: {
        channelId: {
          in: currentUser.subscribedChannelIds,
        },
      },
      include: {
        Channel: true,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    return videos.map((video) => ({
      id: video.id,
      channelId: video.channelId,
      title: video.title,
      description: video.description,
      likeCount: video.likeCount,
      dislikeCount: video.dislikeCount,
      viewCount: video.viewCount,
      createdAt: video.createdAt,
      thumbnailSrc: video.thumbnailSrc,
      videoSrc: video.videoSrc,
    }));
  } catch (error: any) {
    console.error("Error fetching subscription videos:", error);
    throw new Error("Failed to fetch subscription videos.");
  }
}
