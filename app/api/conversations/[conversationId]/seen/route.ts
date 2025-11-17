import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { getCuruentUser } from "@/utils/action";
interface Iparmas {
  conversationId?: string;
}
export async function name(requset: Request, { parmas }: { parmas: Iparmas }) {
  try {
    const curentuser = await getCuruentUser();
    const { conversationId } = parmas;
    if (!curentuser?.email || !conversationId) {
      return new NextResponse("Unauthrized", { status: 401 });
    }
    const conversation = await prisma.conversations.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }
    const updatMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        seen: true,
        sender: true,
      },
      data: {
        seen: {
          connect: {
            id: curentuser.id,
          },
        },
      },
    });
    return NextResponse.json(updatMessage);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (erorr) {
    return new NextResponse("Intener Servar Erorr", { status: 500 });
  }
}
