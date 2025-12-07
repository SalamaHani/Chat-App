import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { SettingsList } from "@/components/settings/SettingsList";

export default async function SettingsLayout({
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
            <Providers>
                <AppSidebar session={session} />
                <SidebarInset className="bg-background">
                    {/* Main header */}
                    <header className="flex h-14 items-center bg-card border-b border-border">
                        <div className="flex w-full items-center justify-between px-4">
                            <SidebarTrigger className="rounded-full p-2 text-muted-foreground transition hover:bg-secondary" />
                        </div>
                    </header>

                    {/* Content area */}
                    <div className="flex h-[calc(100vh-3.5rem)] w-full">
                        {/* Settings List Sidebar */}
                        <SettingsList user={session?.user} />

                        {/* Settings Detail Area */}
                    </div>
                </SidebarInset>
                <div className="flex-1">
                    {children}
                </div>
            </Providers>
        </SidebarProvider>
    );
}
