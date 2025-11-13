import { Message, Conversations, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};
export type FullConversationstype = Conversations & {
  users: User[];
  messages: FullMessageType[];
};
