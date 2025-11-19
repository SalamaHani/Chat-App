"use server";
import db from "./db";
import { getSession } from "./users";
export const getAllUsers = async () => {;
  const session = await getSession();
  const userId = session?.session.userId;
  console.log(userId);
  const Users = await db.user.findMany({
    where: { id: { not: userId } },
  });
  return Users;
}

export const getCuruentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser  = await db.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    if (!currentUser ) {
      return null;
    }
    return currentUser ;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const getConversations = async () => {
  const curentuser = await getCuruentUser();
  if (!curentuser?.id) {
    return [];
  }
  try {
    const Conversations = await db.conversations.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: curentuser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return Conversations;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
};

export const getCaonversationById = async (conversationId: string) => {
  try {
    const curentuser = await getCuruentUser();
    if (!curentuser?.email) {
      return null;
    }
    const Conversation = await db.conversations.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return Conversation;
  } catch (error) {
    return null;
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const curentuser = await getCuruentUser();
    if (!curentuser?.email) {
      return [];
    }
    const Messages = await db.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        seen: true,
        sender: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return Messages;
  } catch (error) {
    return [];
  }
};
