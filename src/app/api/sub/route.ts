import { NextRequest, NextResponse } from "next/server";
import { Channel } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/vendor/db";

async function getCurrentSubscription(): Promise<Channel[]> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return [];
    }
    const subscriptions = await prisma.channel.findMany({
      where: {
        id: {
          in: user.subscribedChannelIds,
        },
      },
    });
    return subscriptions;
  } catch (error: any) {
    throw new Error(error);
  }
}

// API handler
export async function GET(req: NextRequest) {
  try {
    const subscriptions = await getCurrentSubscription();
    return NextResponse.json(subscriptions);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
