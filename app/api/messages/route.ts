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
    await pusherServesr.trigger(conversationId, "messages:new", newMessage);
    const LastMessage =
      UpdatedConvarstion.messages[UpdatedConvarstion.messages.length - 1];
    UpdatedConvarstion.users.map((user) => {
      pusherServesr.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [LastMessage],
      });
    });
    return NextResponse.json(newMessage);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Internal Servar Error ", { status: 500 });
  }
}
