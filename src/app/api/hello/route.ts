import { NextRequest, NextResponse } from "next/server";
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
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: limit,
    });

    // Map channel information to each video
    const videosWithChannels = videos.map((video) => ({
      ...video,
      channel: video.Channel || null, // Ensure channel property is not undefined
    })) as (Video & { channel: Channel })[];
    // console.log(videosWithChannels);
    return videosWithChannels;
  } catch (error: any) {
    throw new Error("Failed to fetch videos: " + error.message);
  }
}

// API handler
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const videos = await fetchVideos(offset, limit);
    return NextResponse.json(videos);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
