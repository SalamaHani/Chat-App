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
