import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
import EmptyConversation from "@/components/conversations/EmptyConversation";

// import ChatMasseg from "@/components/chat/ChatMasseg";
async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");
  return <EmptyConversation />;
}

export default page;
