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
  console.log(conversation);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return <EmptyConversation />;
  }

  return (
    <div className=" relative  pr-4  w-full  rounded-xl ">
      <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4"></div>
      </header>
      <div className="flex flex-1 w-full  p  pt-0">
        <div className="flex flex-1  ">
          <div className=" w-full  ">
            <HedConversation conversation={conversation} />
            <Body intionalMesssages={messages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
