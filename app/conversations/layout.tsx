export const metadata = {
  title: "Chat - Conversations",
  description: "Stay connected with your team through real-time messaging",
};
import { AppSidebar } from "@/components/app-sidebar";
import "../globals.css";
import Providers from "../Providers";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ConversationsList from "@/components/conversations/ConversationsList";
import { getAllUsers, getConversations } from "@/utils/action";
import HadChatFrind from "@/components/chat/HadChatFrind";
import SearshChat from "@/components/chat/SearshChat";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const Conversations = await getConversations();
  if (!session?.user) redirect("/login");
  const users = await getAllUsers();

  return (
    <SidebarProvider>
      <Providers>
        <AppSidebar session={session} />
        <SidebarInset className="bg-[#f0f2f5] dark:bg-[#111b21]">
          {/* Main header */}
          <header className="flex h-14 items-center bg-[#f0f2f5] dark:bg-[#202c33]">
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <p className="text-lg font-semibold text-neutral-800 dark:text-white">Conversations</p>
              </div>
              <SidebarTrigger className="rounded-full p-2 text-neutral-600 dark:text-neutral-400 transition hover:bg-neutral-200 dark:hover:bg-neutral-700" />
            </div>
          </header>

          {/* Content area */}
          <div className="flex h-[calc(100vh-3.5rem)] w-full">
            {/* Conversation list sidebar */}
            <div className="flex h-full w-[400px] flex-col">
              <HadChatFrind users={users} />
              <SearshChat />
              <ConversationsList intialItems={Conversations} />
            </div>
          </div>
        </SidebarInset>

        {/* Chat area */}
        <div className="flex h-full min-h-0 flex-1 w-full bg-[#efeae2] dark:bg-[#0b141a]">
          <div className="flex h-full w-full flex-1">
            {children}
          </div>
        </div>
      </Providers>
    </SidebarProvider>
  );
}

