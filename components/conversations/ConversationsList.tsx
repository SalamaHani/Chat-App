"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FullConversationstype } from "@/app/types";

import ConversationBox from "./ConversationBox";

import EmptyConversationList from "./EmptyConversationList";
import useConverstions from "@/app/hook/useConverstions";
import { ScrollArea } from "../ui/scroll-area";
import { authClient } from "@/lib/auth-client";
import { pusherClient } from "@/lib/Pusher";
import { find } from "lodash";
import { useRouter } from "next/navigation";

interface Conversationsporps {
  intialItems: FullConversationstype[];
}
const ConversationsList: React.FC<Conversationsporps> = ({ intialItems }) => {
  const [Items, setItems] = useState(intialItems);
  console.log(Items);
  const { conversationId } = useConverstions();
  const session = authClient.useSession();
  const route = useRouter();

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    const newHndelr = (conversation: FullConversationstype) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };
    const updateHndelr = (conversation: FullConversationstype) => {
      setItems((current) =>
        current.map((curentConversation) => {
          if (curentConversation.id == conversation.id) {
            return {
              ...curentConversation,
              messages: conversation.messages,
            };
          }
          return curentConversation;
        })
      );
    };
    const deletehndelr = (conversation: FullConversationstype) => {
      setItems((current) => {
        return [...current.filter((vonte) => vonte.id !== conversation.id)];
      });
      if (conversation.id == conversationId) {
        route.push("/conversations");
      }
    };
    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newHndelr);
    pusherClient.bind("conversation:update", updateHndelr);
    pusherClient.bind("conversation:remove", deletehndelr);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHndelr);
      pusherClient.unbind("conversation:update", updateHndelr);
      pusherClient.unbind("conversation:remove", deletehndelr);
    };
  }, [pusherKey, conversationId, route]);

  if (Items.length == 0) {
    return <EmptyConversationList />;
  }

  return (
    <div className="min-h-120 max-h-120 bg-white dark:bg-neutral-900  overflow-hidden">
      <ScrollArea>
        <div className="space-y-2 relative pl-2 pr-4 min-h-120 max-h-120  dark:bg-neutral-900 ">
          {Items.map((item) => {
            console.log(item);
            return (
              <ConversationBox
                data={item}
                isActive={conversationId == item.id}
                key={item.id}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationsList;
