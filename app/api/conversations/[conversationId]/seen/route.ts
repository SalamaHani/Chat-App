import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { getCuruentUser } from "@/utils/action";
import { pusherServesr } from "@/lib/Pusher";

interface IParams {
  params: Promise<{
    conversationId: string;
  }>;
}

export async function POST(request: Request, { params }: IParams) {
  try {
    const resolvedParams = await params;
    const { conversationId } = resolvedParams;
    console.log(conversationId);

    const currentUser = await getCuruentUser();

    if (!currentUser?.id || !conversationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await prisma.conversations.findUnique({
      where: { id: conversationId },
      include: {
        messages: { include: { seen: true }, orderBy: { createdAt: "asc" } },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid Conversation ID", { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) return NextResponse.json(conversation);

    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: { seen: true, sender: true },
      data: {
        seen: { connect: { id: currentUser.id } },
      },
    });
    await pusherServesr.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(updatedMessage);
    }
    await pusherServesr.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error("Error marking message as seen:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
