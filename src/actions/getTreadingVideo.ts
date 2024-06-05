import prisma from "@/vendor/db";
import { Channel, Video } from "@prisma/client";

export default async function getTrendingVideos(): Promise<
  (Video & { channel: Channel })[]
> {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);

    const videos = await prisma.video.findMany({
      include: {
        Channel: true,
      },
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: [
        {
          viewCount: "desc",
        },
      ],
    });

    // Add channel information to each video and return as a tuple
    const videosWithChannels = videos.map((video) => ({
      ...video,
      channel: video.Channel || null, // Ensure channel property is not undefined
    })) as (Video & { channel: Channel })[];

    return videosWithChannels;
  } catch (error: any) {
    throw new Error("Failed to fetch trending videos: " + error.message);
  }
}
