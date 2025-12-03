import { Message, Conversations, User } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};
export type FullConversationstype = Conversations & {
  users: User[];
  messages: FullMessageType[];
  unseenCount?: number;
};
export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
