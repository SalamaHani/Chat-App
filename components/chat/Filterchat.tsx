import React from "react";

import { AnimateIcon } from "../animate-ui/icons/icon";
import { SlidersHorizontal } from "../animate-ui/icons/sliders-horizontal";
import { Heart, MessageSquareDot, User, Users, UserX } from "lucide-react";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuPanel,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "../animate-ui/components/base/menu";
export const currencies = [
  {
    name: "Unread",
    value: "Unread",
    icon: MessageSquareDot,
  },
  {
    name: "Favorits",
    value: "Favorits",
    icon: Heart,
  },
  {
    name: "Contact",
    value: "Contact",
    icon: User,
  },
  {
    name: "Non-contact",
    value: "Non-contact",
    icon: UserX, // no specific icon, fallback to Circle
  },
  {
    name: "Groups",
    value: "Groups",
    icon: Users,
  },
];
function Filterchat() {
  return (
    <Menu  >
      <MenuTrigger>
        <AnimateIcon animateOnHover>
          <SlidersHorizontal size={20} />
        </AnimateIcon>
      </MenuTrigger>
      <MenuPanel >
        <MenuGroup >
          {currencies.map((cur) => {
            const Iconse = cur.icon;
            return (
              <MenuItem
                key={cur.value}
                className={
                  cur.value === ""
                    ? "font-bold dark:bg-neutral-700 bg-neutral-500 text-primary"
                    : ""
                }
              >
                <div className="w-full flex justify-between items-center">
                  {cur.value}
                  <Iconse className="w-4 h-4" />
                </div>
              </MenuItem>
            );
          })}
        </MenuGroup>
      </MenuPanel>
    </Menu>
  );
}

export default Filterchat;
