import prisma from "@/vendor/db";
import { Channel, Video } from "@prisma/client";

// Function to fetch videos with pagination
async function fetchVideos(
  offset: number,
  limit: number
): Promise<(Video & { channel: Channel })[]> {
  try {
    const videos = await prisma.video.findMany({
      include: {
        Channel: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      skip: offset,
      take: limit,
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

// Function to get trending videos with infinite scrolling
export default async function getTrendingVideos(
  pageSize: number = 10
): Promise<(Video & { channel: Channel })[]> {
  let offset = 0;
  const allVideos: (Video & { channel: Channel })[] = [];

  try {
    // Fetch initial set of videos
    let videos = await fetchVideos(offset, pageSize);
    allVideos.push(...videos);

    // Keep fetching more videos until no more are available
    while (videos.length === pageSize) {
      offset += pageSize;
      videos = await fetchVideos(offset, pageSize);
      allVideos.push(...videos);
    }

    return allVideos;
  } catch (error: any) {
    throw new Error("Failed to fetch trending videos: " + error.message);
  }
}
