"use client";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import MessageInput from "./MessageInput";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { SendHorizontal } from "../animate-ui/icons/send-horizontal";
import axios from "axios";
import useConverstion from "@/app/hook/useConverstions";
import { CldUploadButton } from "next-cloudinary";
import { ImageIcon } from "lucide-react";

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
    <div className="py-4 px-4   rounded-br-xl  flex items-center justify-center gap-2 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={handelUlod}
        uploadPreset="chatimge"
      >
        <ImageIcon className="text-sidebar-primary cursor-pointer" size={23} />
      </CldUploadButton>
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
          className=" rounded-full p-2 bg-sidebar-primary cursor-pointer  transition"
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
