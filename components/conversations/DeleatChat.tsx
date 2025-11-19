"use client";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  type AlertDialogPopupProps,
} from "@/components/animate-ui/components/base/alert-dialog";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { Trash } from "../animate-ui/icons/trash";
import {
  RippleButton,
  RippleButtonRipples,
} from "../animate-ui/components/buttons/ripple";

interface BaseAlertDialogDemoProps {
  from: AlertDialogPopupProps["from"];
}

export const DeleatChat = ({ from }: BaseAlertDialogDemoProps) => {
  return (
    <AlertDialog >
      <AlertDialogTrigger>
        <RippleButton className="bg-red-500 ">
          {"Delete"}
          <RippleButtonRipples />
        </RippleButton>
      </AlertDialogTrigger>
      <AlertDialogPopup from={from} className="sm:max-w-[525px]   ">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AnimateIcon
              className="bg-red-300 h-10 w-10 flex items-center justify-center rounded-full text-red-500"
              animateOnHover
            >
              <Trash size={20} className="" />
            </AnimateIcon>
            Delete Conversation ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Delete the entire conversation, including all messages. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            className="bg-red-500 cursor-pointer"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
};
