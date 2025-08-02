import React from "react";
import type { UseFormRegister } from "react-hook-form";

interface TextareaProps {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string | null;
  placeholder?: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  rows,
  name,
  register,
  error,
  placeholder,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        id={name}
        {...(register ? register(name) : {})}
        placeholder={placeholder}
        className={`border px-3 py-2 rounded-md w-full text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Textarea;
