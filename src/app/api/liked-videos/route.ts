import { NextRequest, NextResponse } from "next/server";
import prisma from "@/vendor/db";
import getCurrentUser from "@/actions/getCurrentUser"; // Adjust the import path
import { Channel, Video } from "@prisma/client";

export async function GET(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const likedVideos = await prisma.video.findMany({
      where: {
        id: {
          in: currentUser.likedVideoIds,
        },
      },
      include: {
        Channel: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const videosWithChannels = likedVideos.map((video) => ({
      ...video,
      channel: video.Channel || null,
    })) as (Video & { channel: Channel })[];

    return NextResponse.json(videosWithChannels);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
