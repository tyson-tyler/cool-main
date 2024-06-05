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
    // Update user profile instead of creating a channel
    const updatedUser = await prisma.channel.update({
      where: { id: currentUser.id },
      data: {
        name,
        handle,
        imageSrc,
        // Assuming there are other fields in your user schema that need to be updated here
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.error();
  }
}
