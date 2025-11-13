import { User } from "better-auth";
import { FullConversationstype } from "../types";
import { authClient } from "@/lib/auth-client";
import { useMemo } from "react";

const useOthouUser = (
  conversations: FullConversationstype | { users: User[] }
) => {
  const session = authClient.useSession();
  const othuruser = useMemo(() => {
    const curentuser = session.data?.user.email;
    const othuruser = conversations.users.filter(
      (user) => user.email != curentuser
    );
    return othuruser[0];
  }, [conversations.users, session.data?.user.email]);
  return othuruser;
};

export default useOthouUser;
