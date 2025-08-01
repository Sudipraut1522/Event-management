import React from "react";
import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: keyof T;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  className?: string;
};

export const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  type = "text",
  placeholder = "",
  error,
  className = "",
}: InputFieldProps<T>) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={String(name)}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={String(name)}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error?.message}</p>}
    </div>
  );
};
