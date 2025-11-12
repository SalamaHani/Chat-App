import { NextResponse } from "next/server";
import { getCuruentUser } from "@/utils/action";
import prisma from "@/utils/db";
export async function POST(requset: Request) {
  try {
    const cureuntUser = await getCuruentUser();
    const body = await requset.json();
    const { userId, isGroup, members, name } = body;
    if (!cureuntUser?.id || !cureuntUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (isGroup && (members.length > 2 || name)) {
      return new NextResponse("invalid data", { status: 400 });
    }
    if (isGroup) {
      const newConversations = await prisma.conversations.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((members: { value: string }) => ({
                id: members.value,
              })),
              {
                id: cureuntUser?.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversations);
    }
    const exsistingConversations = await prisma.conversations.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [userId, cureuntUser.id],
            },
          },
          {
            userIds:{
                equals:[cureuntUser.id , userId]
            }
          }
        ],
      },
    });
    const singelConversations = exsistingConversations
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
