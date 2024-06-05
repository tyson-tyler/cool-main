// types.ts
import { Channel, Video } from "@prisma/client";

export interface TrendingVideosResult {
  videos: (Video & { channel: Channel })[];
  nextPage: number | null;
  totalPages: number;
}
