import { authOptions } from "@/lib/auth";
import prisma from "@/vendor/db";

import { getServerSession } from "next-auth";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    return currentUser;
  } catch (error) {
    return null;
  }
}
