import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  disabled: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  changeValue: (id: string, value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,

  changeValue,
}) => {
  return (
    <div className="relative">
      <div
        contentEditable={true}
        onInput={(e) => changeValue?.(id, e.currentTarget.innerText || "")}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        className={`peer w-full px-4 pt-7 pb-2 min-h-[100px] rounded-md outline-none dark:bg-gray-800 dark:text-white bg-white text-black shadow-md transtion ${
          errors[id]
            ? "border-red-500 focus:border-red-600"
            : "border-purple-500 focus:border-purple-700"
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      />
      <label
        htmlFor={id}
        className={`absolute dark:bg-gray-800 px-1 top-1 left-4 z-[1] ${
          errors[id] ? "text-red-600" : "text-zinc-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
