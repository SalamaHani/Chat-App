"use client";
import useConverstion from "@/app/hook/useConverstion";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { FaHips } from "react-icons/fa";
import MessageInput from "./MessageInput";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { Send } from "lucide-react";
import Typeinpust from "./Typeinpust";
import { SendHorizontal } from "../animate-ui/icons/send-horizontal";

function FormChat() {
  const { converstionId } = useConverstion();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {};
  return (
    <div className="py-4 px-4   border-t flex items-center gap-2 w-full">
      <Typeinpust />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          error={errors}
          required
          placeholder="Write a Message"
        />
        <button type="submit" className=" rounded-full p-2  transition">
          <AnimateIcon animateOnHover>
            <SendHorizontal />
          </AnimateIcon>
        </button>
      </form>
    </div>
  );
}

export default FormChat;
