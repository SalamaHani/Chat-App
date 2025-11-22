"use client";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import MessageInput from "./MessageInput";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { SendHorizontal } from "../animate-ui/icons/send-horizontal";
import axios from "axios";
import useConverstion from "@/app/hook/useConverstions";
import { CldUploadButton } from "next-cloudinary";
import { ImageIcon } from "lucide-react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface AccountProps {
  curentUser: User;
}
function FormAccount({ curentUser }: AccountProps) {
  const [isLoding, setIsloding] = useState(false);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: curentUser?.name,
      image: curentUser?.image,
      bio: curentUser?.bio,
    },
  });
  const image = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloding(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        route.refresh();
      })
      .catch(() => toast.error("Somtihing Wroing !"))
      .finally(() => setIsloding(false));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelUlod = (resault: any) => {
    setValue("image", resault?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  return (
    <div className="py-4 px-4   rounded-br-xl  flex items-center justify-center gap-2 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={handelUlod}
        uploadPreset="chatimge"
      >
        <ImageIcon className="text-sidebar-primary" size={23} />
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

export default FormAccount;
