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

    const currentUser = await getCuruentUser();

    if (!currentUser?.id || !conversationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await prisma.conversations.findUnique({
      where: { id: conversationId },
      include: {
        messages: { include: { seen: true, sender: true }, orderBy: { createdAt: "asc" } },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid Conversation ID", { status: 400 });
    }

    // Find all unseen messages (messages where current user is not in seenIds)
    const unseenMessages = conversation.messages.filter(
      (msg) => !msg.seenIds.includes(currentUser.id)
    );

    if (unseenMessages.length === 0) {
      return NextResponse.json({ success: true, updatedCount: 0 });
    }

    // Mark ALL unseen messages as seen
    await prisma.message.updateMany({
      where: {
        id: { in: unseenMessages.map((msg) => msg.id) },
      },
      data: {
        seenIds: { push: currentUser.id },
      },
    });

    // Also update the user's seenMessageIds
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        seenMessageIds: { push: unseenMessages.map((msg) => msg.id) },
      },
    });

    // Get updated conversation with all messages
    const updatedConversation = await prisma.conversations.findUnique({
      where: { id: conversationId },
      include: {
        users: true,
        messages: {
          include: { seen: true, sender: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!updatedConversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    // Create LIGHTWEIGHT payload for Pusher (max 10KB limit)
    // Include: last message for display + IDs of messages that were marked as seen
    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    const conversationPayload = {
      id: conversationId,
      lastMessageAt: updatedConversation.lastMessageAt,
      // IDs of messages just marked as seen + the user who saw them
      seenUpdate: {
        seenByUserId: currentUser.id,
        seenByUserEmail: currentUser.email,
        messageIds: unseenMessages.map((msg) => msg.id),
      },
      // Last message for conversation list display
      messages: lastMessage ? [{
        id: lastMessage.id,
        body: lastMessage.body,
        image: lastMessage.image ? "📷" : null,
        createdAt: lastMessage.createdAt,
        senderId: lastMessage.senderId,
        sender: {
          id: lastMessage.sender.id,
          name: lastMessage.sender.name,
          email: lastMessage.sender.email,
          image: lastMessage.sender.image,
        },
        seen: lastMessage.seen.map((u) => ({ id: u.id, email: u.email })),
      }] : [],
    };

    // Notify ALL conversation users about the seen update for conversation list
    for (const user of updatedConversation.users) {
      await pusherServesr.trigger(user.email!, "conversation:update", conversationPayload);
    }

    // Send message:update for ALL messages that were marked as seen
    // This updates the checkmarks in the chat view
    for (const msg of updatedConversation.messages) {
      // Only send update for messages that were just marked as seen
      if (unseenMessages.some((unseen) => unseen.id === msg.id)) {
        await pusherServesr.trigger(conversationId, "message:update", {
          id: msg.id,
          seen: msg.seen.map((u) => ({ id: u.id, email: u.email })),
        });
      }
    }

    return NextResponse.json({ success: true, updatedCount: unseenMessages.length });
  } catch (error) {
    console.error("Error marking messages as seen:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

