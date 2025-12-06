import Body from "@/components/conversations/Body";
import EmptyConversation from "@/components/conversations/EmptyConversation";
import HedConversation from "@/components/conversations/HedConversation";
import { getCaonversationById, getMessages } from "@/utils/action";
import React from "react";

interface IdPrames {
  params: Promise<{
    conversationId: string;
  }>;
}

async function page({ params }: IdPrames) {
  const resolvedParams = await params;
  const { conversationId } = resolvedParams;
  const conversation = await getCaonversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return <EmptyConversation />;
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <HedConversation conversation={conversation} />
      <Body intionalMesssages={messages} isGroup={!!conversation.isGroup} />
    </div>
  );
}

export default page;

