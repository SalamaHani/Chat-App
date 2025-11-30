import { useEffect } from "react";
import { pusherClient } from "@/lib/Pusher";
import { useActive } from "./useActive";
import { Channel } from "pusher-js";

export const useActiveUsers = () => {
  const { add, set, remove } = useActive();

  useEffect(() => {
    // Subscribe to the channel (no need to store it in state)
    const channel: Channel = pusherClient.subscribe("presence-members");

    // Initial members
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel.bind("pusher:subscription_succeeded", (members: any) => {
      const initialMembers: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      members.each((member: Record<string, any>) => {
        initialMembers.push(member.id);
      });
      set(initialMembers); // update active users state from useActive hook
    });

    // Member joined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
    });

    // Member left
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      pusherClient.unsubscribe("presence-members");
    };
  }, [set, add, remove]);

  // return nothing or return active user IDs from your useActive hook
  return null;
};
