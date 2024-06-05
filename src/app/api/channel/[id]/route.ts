import { NextRequest, NextResponse } from "next/server";
import prisma from "@/vendor/db";
import { Channel, Video } from "@prisma/client";

async function fetchVideos(
  channelId: string,
  offset: number,
  limit: number
): Promise<(Video & { channel: Channel })[]> {
  try {
    const videos = await prisma.video.findMany({
      where: { channelId },
      include: { Channel: true },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    return videos.map((video) => ({
      ...video,
      channel: video.Channel || null,
    })) as (Video & { channel: Channel })[];
  } catch (error: any) {
    throw new Error("Failed to fetch videos: " + error.message);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid channel ID" }, { status: 400 });
  }

  try {
    const channel = await prisma.channel.findUnique({
      where: { id },
    });

    if (!channel) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    const videos = await fetchVideos(id, offset, limit);
    return NextResponse.json({ channel, videos });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
