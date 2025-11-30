import { NextApiRequest, NextApiResponse } from "next";
import { pusherServesr } from "@/lib/Pusher";
import { getSession } from "@/utils/users";
import { BetterAuthOptions } from "better-auth";
export async function Hndelar(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getSession();
  if (!session?.user?.email) {
    return response.status(401);
  }
  const socketId = request.body.socket_id;
  const userData = {
    id: session.user.email,
    info: {
      name: session.user.name,
      email: session.user.email,
    },
  };
  const authRespones = pusherServesr.authenticateUser(socketId, userData);
  return response.send(authRespones);
}
