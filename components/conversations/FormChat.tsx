"use client";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import MessageInput from "./MessageInput";
import { AnimateIcon } from "../animate-ui/icons/icon";
import Typeinpust from "./Typeinpust";
import { SendHorizontal } from "../animate-ui/icons/send-horizontal";

function FormChat() {
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
    <div className="py-4 px-4   rounded-br-xl  flex items-center justify-center gap-2 w-full">
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
        <button
          type="submit"
          className=" rounded-full p-2 bg-sidebar-primary  transition"
        >
          <AnimateIcon animateOnHover>
            <SendHorizontal color="#f0f9ff" size={20} />
          </AnimateIcon>
        </button>
      </form>
    </div>
  );
}

export default FormChat;
