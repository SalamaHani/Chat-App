"use server";
import db from "./db";
import { getSession } from "./users";

export const GetAllUsers = async () => {};
export const faveretlisting = async () => {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id;
  const Users = await db.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    include: {
      messages: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return Users;
};
