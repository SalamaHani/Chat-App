import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ChatMasseg from "@/components/chat/ChatMasseg";

import { redirect } from "next/navigation";
async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) redirect("/login");
  return <ChatMasseg />;
}

export default page;
