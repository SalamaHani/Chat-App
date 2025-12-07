import { getCuruentUser } from "@/utils/action";
import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { pusherServesr } from "@/lib/Pusher";

export async function POST(requset: Request) {
  try {
    const currentuser = await getCuruentUser();
    const body = await requset.json();
    const { message, conversationId, image } = body;
    if (!currentuser?.id || !currentuser?.email) {
      return new NextResponse("Unauthrized", { status: 401 });
    }
    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentuser?.id,
          },
        },
        seen: {
          connect: {
            id: currentuser?.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });
    const UpdatedConvarstion = await prisma.conversations.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    // Create a lightweight payload for Pusher (max 10KB limit)
    const pusherPayload = {
      id: newMessage.id,
      body: newMessage.body,
      image: newMessage.image, // Keep image URL - client needs it
      createdAt: newMessage.createdAt,
      senderId: newMessage.senderId,
      conversationId: newMessage.conversationId,
      sender: {
        id: newMessage.sender.id,
        name: newMessage.sender.name,
        email: newMessage.sender.email,
        image: newMessage.sender.image,
      },
      seen: newMessage.seen.map((u) => ({ id: u.id, email: u.email })),
    };

    await pusherServesr.trigger(conversationId, "messages:new", pusherPayload);
    const LastMessage =
      UpdatedConvarstion.messages[UpdatedConvarstion.messages.length - 1];

    // Lightweight payload for conversation update with full sender info
    const lastMessagePayload = {
      id: LastMessage.id,
      body: LastMessage.body,
      image: LastMessage.image ? "📷" : null, // Just indicate there's an image
      createdAt: LastMessage.createdAt,
      senderId: newMessage.senderId,
      sender: {
        id: newMessage.sender.id,
        name: newMessage.sender.name,
        email: newMessage.sender.email,
        image: newMessage.sender.image,
      },
      seen: LastMessage.seen.map((u) => ({ id: u.id, email: u.email })),
    };

    UpdatedConvarstion.users.map((user) => {
      pusherServesr.trigger(user.email!, "conversation:update", {
        id: conversationId,
        lastMessageAt: UpdatedConvarstion.lastMessageAt,
        messages: [lastMessagePayload],
      });
    });
    return NextResponse.json(newMessage);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Servar Error ", { status: 500 });
  }
}
