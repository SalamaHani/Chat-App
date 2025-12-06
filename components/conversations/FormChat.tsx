"use client";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import MessageInput from "./MessageInput";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { SendHorizontal } from "../animate-ui/icons/send-horizontal";
import axios from "axios";
import useConverstion from "@/app/hook/useConverstions";
import { CldUploadButton } from "next-cloudinary";
import { ImageIcon, Smile } from "lucide-react";
import { usePendingMessages } from "@/app/context/PendingMessagesContext";

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
  const { addPendingMessage, updatePendingMessageStatus, removePendingMessage } = usePendingMessages();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.message?.trim()) return;

    // Add pending message for instant display
    const pendingId = addPendingMessage({
      body: data.message,
      image: null,
      conversationId,
    });

    // Clear input immediately
    setValue("message", "", { shouldValidate: true });

    try {
      await axios.post("/api/messages", {
        ...data,
        conversationId,
      });
      // Message sent successfully - remove pending (real message will come from pusher)
      updatePendingMessageStatus(pendingId, "sent");
      // Remove after a short delay to allow pusher to deliver
      setTimeout(() => removePendingMessage(pendingId), 500);
    } catch (error) {
      // Mark as failed
      updatePendingMessageStatus(pendingId, "failed");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelUlod = async (resault: any) => {
    const imageUrl = resault?.info?.secure_url;
    if (!imageUrl) return;

    // Add pending image message
    const pendingId = addPendingMessage({
      body: null,
      image: imageUrl,
      conversationId,
    });

    try {
      await axios.post("/api/messages", {
        image: imageUrl,
        conversationId,
      });
      updatePendingMessageStatus(pendingId, "sent");
      setTimeout(() => removePendingMessage(pendingId), 500);
    } catch (error) {
      updatePendingMessageStatus(pendingId, "failed");
    }
  };

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Emoji button */}
      <button type="button" className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
        <Smile size={24} />
      </button>

      {/* Attachment button */}
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={handelUlod}
        uploadPreset="chatimge"
      >
        <ImageIcon className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 cursor-pointer transition-colors" size={24} />
      </CldUploadButton>

      {/* Message input form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3 flex-1"
      >
        <MessageInput
          id="message"
          register={register}
          error={errors}
          required
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="rounded-full p-2.5 bg-[#00a884] hover:bg-[#008f72] cursor-pointer transition-colors"
        >
          <AnimateIcon animateOnHover>
            <SendHorizontal color="#fff" size={20} />
          </AnimateIcon>
        </button>
      </form>
    </div>
  );
}

export default FormChat;


