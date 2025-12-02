import { useEffect } from "react";
import { pusherClient } from "@/lib/Pusher";
import { useActive } from "./useActive";

export const useActivelist = () => {
  const { add, set, remove, mempers } = useActive(); // mempers = current active users

  useEffect(() => {
    // Subscribe once, no need for state
    const channel = pusherClient.subscribe("presence-members");

    // Initial members
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel.bind("pusher:subscription_succeeded", (members: any) => {
      const initialMembers: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      members.each((member: Record<string, any>) => {
        initialMembers.push(member.id);
      });
      set(initialMembers); // update active users
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

    // Cleanup
    return () => {
      pusherClient.unsubscribe("presence-members");
    };
  }, [set, add, remove]);

  // Return the current list of active users
  return mempers;
};
