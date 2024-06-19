import { PrismaClient, Video as PrismaVideo } from "@prisma/client";

const prisma = new PrismaClient();

export async function createVideo(videoData: PrismaVideo) {
  return prisma.video.create({
    data: videoData,
  });
}

export async function getVideoById(videoId: string) {
  return prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });
}
