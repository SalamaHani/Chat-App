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
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="w-full py-2.5 px-4 rounded-lg bg-white dark:bg-[#2a3942] text-neutral-900 dark:text-white text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none border-0"
      />
    </div>
  );
};

export default MessageInput;

