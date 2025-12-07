export const metadata = {
  title: "Account - Manage Your Profile",
  description:
    "View and edit your account information, profile details, and personal settings. Update your name, bio, and profile picture.",
  robots: {
    index: false, // Account page should not be indexed (requires auth)
    follow: false,
  },
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

export default async function AccounLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) redirect("/login");
  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <SidebarInset>
        <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>

      </SidebarInset>
      <Providers>{children}</Providers>
    </SidebarProvider>
  );
}
