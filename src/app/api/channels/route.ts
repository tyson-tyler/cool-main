import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/vendor/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { name, handle, imageSrc } = await request.json();

  try {
    const createdChannel = await prisma.channel.create({
      data: {
        name,
        handle,
        imageSrc,
        userId: currentUser.id,
        // Assuming there are other fields in your schema that need to be provided here
      },
    });

    return NextResponse.json(createdChannel);
  } catch (error) {
    console.error("Error creating channel:", error);
    return NextResponse.error();
  }
}
