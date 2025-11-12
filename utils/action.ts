"use server";
import db from "./db";
import { getSession } from "./users";
export const GetAllUsers = async () => {};
export const faveretlisting = async () => {
  const session = await getSession();
  const userId = session?.session.userId;
  console.log(userId);
  const Users = await db.user.findMany({
    where: { id: { not: userId } },
  });
  return Users;
};

export const getCuruentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const cureuntUser = await db.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    if (!cureuntUser) {
      return null;
    }
    return cureuntUser;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
