import Body from "@/components/conversations/Body";
import EmptyConversation from "@/components/conversations/EmptyConversation";
import HedConversation from "@/components/conversations/HedConversation";
import { getCaonversationById, getMessages } from "@/utils/action";
import React from "react";
interface IdPrames {
  conversationId: string;
}
async function page({ params }: { params: IdPrames }) {
  const conversation = await getCaonversationById(params?.conversationId);
  const messages = await getMessages(params?.conversationId);
  console.log(messages);

  if (!conversation) {
    return <EmptyConversation />;
  }

  return (
    <div className=" relative  pr-4 bg-background w-full  rounded-xl">
      <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4"></div>
      </header>
      <div className="flex flex-1 w-full  rounded-xl gap-4 p-4 pt-0">
        <div className="flex flex-1 rounded-xl ">
          <div className="bg-[#2e4a71] rounded-xl  w-full h-full">
            <HedConversation conversation={conversation} />
            <Body />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
