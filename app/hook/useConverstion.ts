import { Param } from "@prisma/client/runtime/library";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConverstion = () => {
  const Params = useParams();

  const converstionId = useMemo(() => {
    if (!Params?.converstionId) {
      return "";
    }
    return Params?.converstionId as string;
  }, [Params?.converstionId]);
  const isOpen = useMemo(() => !!converstionId, [converstionId]);

  return useMemo(
    () => ({
      isOpen,
      converstionId,
    }),
    [converstionId, isOpen]
  );
};
export default useConverstion