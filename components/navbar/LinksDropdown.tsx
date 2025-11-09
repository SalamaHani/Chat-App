import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LuAlignLeft } from "react-icons/lu";
import { Button } from "../ui/button";
import { Session } from "@/lib/auth";
import Link from "next/link";
import { Logout } from "../logout";
import { setstring } from "@/utils/format";
function LinksDropdown({ session }: { session: Session | null }) {
  const username = session?.user.name;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          {session ? (
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>{setstring(username ?? "")}</AvatarFallback>
            </Avatar>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        {!session ? (
          <div>
            <DropdownMenuItem>
              <Link href="/login">
                <button className="w-full text-left">Login</button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/signup">
                <button className="w-full text-left">Signup</button>
              </Link>
            </DropdownMenuItem>
          </div>
        ) : (
          <div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Logout
              <Logout />
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
