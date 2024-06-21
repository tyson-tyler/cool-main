import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/vendor/db";
import { Channel, Video } from "@prisma/client";

interface GetRecommendedVideosProps {
  video: Video | null;
  skip: number;
  limit: number;
}

export async function getRecommendedVideos(
  params: GetRecommendedVideosProps
): Promise<(Video & { channel: Channel })[]> {
  const { video, skip, limit } = params;

  try {
    const videos = (await prisma.video.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: "default",
            moreLikeThis: {
              like: [
                {
                  description: video?.description,
                  title: video?.title,
                },
              ],
            },
          },
        },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: "Channel",
            localField: "channelId",
            foreignField: "_id",
            as: "channel",
          },
        },
        {
          $project: {
            _id: 0,
            id: { $toString: "$_id" },
            title: 1,
            description: 1,
            createdAt: 1,
            thumbnailSrc: 1,
            viewCount: 1,
            channel: { $arrayElemAt: ["$channel", 0] },
          },
        },
      ],
    })) as unknown as (Video & { channel: Channel })[];

    return videos.filter((vid) => vid.id !== video?.id);
  } catch (error: any) {
    throw new Error(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { video, skip, limit } = req.query;

  if (!video) {
    res.status(400).json({ error: "Video is required" });
    return;
  }

  const videoData = JSON.parse(video as string) as Video;
  const skipNum = parseInt(skip as string, 10) || 0;
  const limitNum = parseInt(limit as string, 10) || 10;

  try {
    const recommendedVideos = await getRecommendedVideos({
      video: videoData,
      skip: skipNum,
      limit: limitNum,
    });

    res.status(200).json(recommendedVideos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
