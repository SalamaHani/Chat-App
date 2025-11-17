"use client";

import { AnimateIcon } from "../animate-ui/icons/icon";
import { CldUploadButton } from "next-cloudinary";
import { Eraser, Camera, User, Image, File } from "lucide-react";

import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuPanel,
  MenuTrigger,
} from "../animate-ui/components/base/menu";
import { Ellipsis } from "../animate-ui/icons/ellipsis";
export const currencies = [
  {
    name: "Photo & vdio",
    value: "Photo & vdio",
    icon: Image,
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
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  uploadPreset="chatimge"
                >
                  <div className="w-full flex justify-between items-center">
                    Photo & vdio
                    <Iconse className="w-4 h-4" />
                  </div>
                </CldUploadButton>
              </MenuItem>
            );
          })}
        </MenuGroup>
      </MenuPanel>
    </Menu>
  );
}

export default Typeinpust;
