"use client";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import MessageInput from "./MessageInput";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { SendHorizontal } from "../animate-ui/icons/send-horizontal";
import axios from "axios";
import useConverstion from "@/app/hook/useConverstions";
import { CldUploadButton } from "next-cloudinary";
import { ImageIcon, Mic, Paperclip, SmilePlus } from "lucide-react";

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
  const { conversationId } = useConverstion();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelUlod = (resault: any) => {
    axios.post("/api/messages", {
      image: resault?.info?.secure_url,
      conversationId,
    });
  };
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-white/5 bg-[#182229] px-4 py-3 text-[#e9edef] shadow-[0_10px_34px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Emoji picker"
          className="rounded-full border border-transparent p-2 text-[#b1bcc5] transition hover:border-white/20 hover:text-white"
        >
          <SmilePlus size={20} />
        </button>
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onSuccess={handelUlod}
          uploadPreset="chatimge"
        >
          <ImageIcon
            className="cursor-pointer text-[#b1bcc5] transition hover:text-white"
            size={20}
          />
        </CldUploadButton>
        <button
          type="button"
          aria-label="Attach files"
          className="rounded-full border border-transparent p-2 text-[#b1bcc5] transition hover:border-white/20 hover:text-white"
        >
          <Paperclip size={20} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-3"
      >
        <MessageInput
          id="message"
          register={register}
          error={errors}
          required
          placeholder="Type a message…"
        />
        <button
          type="button"
          aria-label="Record voice note"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#b1bcc5] transition hover:text-white"
        >
          <Mic size={18} />
        </button>
        <button
          type="submit"
          className="flex h-11 w-16 items-center justify-center rounded-full bg-[#00a884] text-white transition hover:bg-[#02956e]"
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
