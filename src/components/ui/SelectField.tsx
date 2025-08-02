import React from "react";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: Option[];
  placeholder?: string;
  error?: string | null | undefined;
  className?: string;
};

export const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select an option",
  error,
  className = "",
}: SelectFieldProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full px-3 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">
          <p className="text-gray-300">{placeholder}</p>
        </option>
        {options?.map((opt) => (
          <option key={opt?.value} value={opt?.value}>
            {opt?.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
