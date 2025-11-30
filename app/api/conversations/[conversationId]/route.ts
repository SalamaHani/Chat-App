import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { getCuruentUser } from "@/utils/action";
import { pusherServesr } from "@/lib/Pusher";
interface IParams {
  params: Promise<{
    conversationId: string;
  }>;
}
export async function DELETE(requset: Request, { params }: IParams) {
  try {
    const currentUser = await getCuruentUser();
    const resolvedParams = await params;
    const { conversationId } = resolvedParams;
    console.log(conversationId);
    if (!currentUser?.id) {
      return new NextResponse("Unauthrized", { status: 401 });
    }
    const conversation = await prisma.conversations.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }
    const deleletconvarsetion = await prisma.conversations.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser?.id],
        },
      },
    });
    conversation.users.forEach((user) => {
      if (user.email) {
        pusherServesr.trigger(user.email, "conversation:remove", conversation);
      }
    });
    return NextResponse.json(deleletconvarsetion);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Internal Servaer Erorre", { status: 500 });
  }
}
