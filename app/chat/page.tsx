import React from "react";
import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ChatMasseg from "@/components/chat/ChatMasseg";
import ChatFrinds from "@/components/chat/ChatFrinds";
async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session);
  return (
    <div>
      <SidebarProvider>
        <AppSidebar session={session} />
        <SidebarInset>
          <header className="flex   h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="flex flex-2  gap-4 p-4 pt-0">
            {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div> */}
            <div className="bg-muted/50 flex  min-h-[100vh] flex-1 rounded-xl md:min-h-min">
              <ChatFrinds />
              <ChatMasseg />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default page;
