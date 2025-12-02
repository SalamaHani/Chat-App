// pages/api/pusher/auth.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { pusherServesr } from "@/lib/Pusher";
import { auth } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const headersObj: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") {
      headersObj[key] = value;
    } else if (Array.isArray(value)) {
      headersObj[key] = value.join(", "); // combine multiple header values
    }
  }

  const session = await auth.api.getSession({ headers: headersObj });

  if (!session?.user?.email) {
    return res.status(401).send("Unauthorized");
  }

  const { socket_id, channel_name } = req.body;

  const data = {
    user_id: session.user.id,
    user_info: {
      email: session.user.email,
      name: session.user.name,
    },
  };

  const authResponse = pusherServesr.authorizeChannel(
    socket_id,
    channel_name,
    data
  );
  return res.status(200).json(authResponse);
}
