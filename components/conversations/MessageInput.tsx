import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
interface MessageINputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  error?: FieldErrors;
}
const MessageInput: React.FC<MessageINputProps> = ({
  placeholder,
  id,
  type,
  required,
  register,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete="off"
        {...register(id, { required })}
        placeholder={placeholder}
        className="w-full rounded-3xl border border-white/5 bg-[#0b141a] py-3 px-5 text-sm text-[#e9edef] placeholder:text-[#6c7880] shadow-inner shadow-black/20 transition focus:outline-none focus:ring-2 focus:ring-[#00a884]"
      />
    </div>
  );
};

export default MessageInput;
