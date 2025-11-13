import { headers } from "next/headers";
import { auth } from "@/lib/auth";


import { redirect } from "next/navigation";
import ConversationsList from "@/components/conversations/ConversationsList";
import { getConversations } from "@/utils/action";
async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const Conversations = await getConversations()
  if (!session?.user) redirect ("/login");
  return <ConversationsList intialItems={Conversations} />;
}

export default page;