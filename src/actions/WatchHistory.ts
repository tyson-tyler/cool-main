// In your backend API route: pages/api/add-to-watch-history.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../vendor/db"; // Adjust the import path to your Prisma client instance
import getCurrentUser from "./getCurrentUser"; // Adjust the import path
import { Video, WatchHistory } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { videoId } = req.body;

  const currentUser = await getCurrentUser(); // Implement this function to get the current user

  if (!currentUser) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await prisma.watchHistory.create({
      data: {
        userId: currentUser.id,
        videoId: video.id,
        watchedAt: new Date(),
      },
    });

    res
      .status(200)
      .json({ message: "Video added to watch history successfully" });
  } catch (error) {
    console.error("Error adding video to watch history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
