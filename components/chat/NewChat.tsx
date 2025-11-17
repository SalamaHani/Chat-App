import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../animate-ui/components/radix/dialog";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { CirclePlus } from "../animate-ui/icons/circle-plus";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { faveretlisting } from "@/utils/action";
import Users from "./Users";
import { UsersRound } from "../animate-ui/icons/users-round";
import { Separator } from "../ui/separator";

async function NewChat({ isButton }: { isButton?: boolean }) {
  const users = await faveretlisting();
  return (
    <Dialog>
      <DialogTrigger>
        {isButton ? (
          <Button>New Chat</Button>
        ) : (
          <AnimateIcon animateOnHover>
            <CirclePlus size={20} />
          </AnimateIcon>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] ">
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>
        <div className=" overflow-hidden h-full  w-full">
          <div className="  flex-1 flex  flex-col space-y-2 p-4  bg-white dark:bg-neutral-950  shrink-0  gap-2  ">
            <div
              className={`${
                true ? ` bg-neutral-100 dark:bg-neutral-800` : `bg-none`
              } dark:hover:bg-neutral-800   py-2 bg-red-200 hover:bg-neutral-50 flex items-center justify-between cursor-pointer  rounded-sm  `}
            >
              <div className="flex px-4 items-center gap-2">
                <div className=" relative">
                  <div className=" relative rounded-full flex justify-center items-center  ring-1  ring-white  h-12 w-12 ">
                    <AnimateIcon animateOnHover>
                      <UsersRound />
                    </AnimateIcon>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">New Group</div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 mt-6">
            <p className=" italic font-medium text-sm">All Contact</p>
            <Separator />
          </div>
          <div
            className={
              "space-y-2 relative px-2 min-h-80 max-h-80 overflow-y-auto"
            }
          >
            {users.map((user) => {
              return <Users key={user.id} user={user} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default NewChat;
