// pages/api/increaseVideoViewCount.ts

import { NextApiRequest, NextApiResponse } from "next";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ error: "Video ID is required" });
    }

    try {
      const video = await increaseVideoViewCount({ videoId });
      return res.status(200).json(video);
    } catch (error) {
      console.error("Error increasing video view count:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
