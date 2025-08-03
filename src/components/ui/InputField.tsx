import React from "react";
import type { UseFormRegister } from "react-hook-form";

type InputFieldProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  type?: string;
  placeholder?: string;
  error?: string | null | undefined;
  className?: string;
};

export const InputField = ({
  label,
  name,
  register,
  type = "text",
  placeholder = "",
  error,
  className = "",
  ...rest
}: InputFieldProps) => {
  return (
    <div className={`mb-1 ${className}`}>
      <label
        htmlFor={String(name)}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        {...(register ? register(name) : {})}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
