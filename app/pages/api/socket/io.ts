import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "@/app/types";

export const config = {
  api: {
    bodyParser: false,
  },
};
const ioHndelr = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
      //   socket.on("users-connection", (userId: string) => {
      //     console.log(!onlineUsers.includes(userId));
      //     if (!onlineUsers.includes(userId)) onlineUsers.push(userId);
      //     io.emit("online-user", onlineUsers);
      //   });
      //   socket.on("disconnect", () => {
      //     onlineUsers = onlineUsers.filter((id) => id !== socket.id);
      //     io.emit("online-users", onlineUsers);
      //   });
    });
    res.socket.server.io = io;
  }
  res.end();
};
