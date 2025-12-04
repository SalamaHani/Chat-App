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
    <div className="flex h-full w-full rounded-[32px] border border-white/5 bg-[#0b141a] shadow-2xl shadow-black/40">
      <div className="flex w-full flex-col rounded-[32px]">
        <HedConversation conversation={conversation} />
        <Body intionalMesssages={messages} />
      </div>
    </div>
  );
}

export default page;
