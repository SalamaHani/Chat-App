import React from "react";
import { getConversations } from "@/utils/action";
import { FullConversationstype } from "@/app/types";
interface Conversationsporps {
  intialItems: FullConversationstype[];
}
const ConversationsList: React.FC<Conversationsporps> = ({ intialItem }) => {
  return <div></div>;
};

export default ConversationsList;
