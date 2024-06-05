"use client";

import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  ValidationRule,
} from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  pattern?: ValidationRule<RegExp>;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  register,
  required,
  errors,
  pattern,
  className,
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required, pattern })}
        placeholder=""
        type={type}
        className={`peer w-full px-4 py-2 rounded-md ouline-none border-[1px] dark:bg-gray-800 transition ${
          errors[id]
            ? "border-red-500 focus:border-red-500 "
            : "border-purple-500 focus:border-purple-600"
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      />
      <label
        htmlFor={id}
        className={`absolute dark:bg-gray-800 bg-white px-1 top-2 left-4 z-[1] duration-100 -translate-y-5 transform orgin-[0px] peer-placeholder=shown:scale-100 peer-placeholder:shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-5 ${
          errors[id] ? "text-red-500" : "text-gray-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};
export default Input;
