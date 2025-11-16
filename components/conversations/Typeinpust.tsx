import React from "react";

import { AnimateIcon } from "../animate-ui/icons/icon";
import { SlidersHorizontal } from "../animate-ui/icons/sliders-horizontal";
import { Eraser, Camera, User, Image, File } from "lucide-react";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuPanel,
  MenuTrigger,
} from "../animate-ui/components/base/menu";
import { Link } from "../animate-ui/icons/link";
import { Ellipsis } from "../animate-ui/icons/ellipsis";
export const currencies = [
  {
    name: "Photo & vdio",
    value: "Photo & vdio",
    icon: Image,
  },
  {
    name: "Camera",
    value: "Camera",
    icon: Camera,
  },
  {
    name: "Contact",
    value: "Contact",
    icon: User,
  },
  {
    name: "Ducomnet",
    value: "Ducomnet",
    icon: File, // no specific icon, fallback to Circle
  },
  {
    name: "Drwing",
    value: "Drwing",
    icon: Eraser,
  },
];
function Typeinpust() {
  return (
    <Menu>
      <MenuTrigger className="rounded-xl p-2  transition">
        <AnimateIcon animateOnHover>
          <Ellipsis className="text-sidebar-primary" size={23} />
        </AnimateIcon>
      </MenuTrigger>
      <MenuPanel>
        <MenuGroup>
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

export default Typeinpust;
