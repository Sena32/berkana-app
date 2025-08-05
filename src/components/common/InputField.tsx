import React, { FC, forwardRef } from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string | number;
  max?: string | number;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string; // Optional hint text
}

// Suporte a forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      id,
      name,
      placeholder,
      defaultValue,
      onChange,
      className = "",
      min,
      max,
      step,
      disabled = false,
      success = false,
      error = false,
      hint,
      ...rest
    },
    ref
  ) => {
    let inputClasses = `h-12 w-full rounded-lg border appearance-none px-4 py-2.5 text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#B5D334] focus:border-[#B5D334] bg-white text-gray-800 border-gray-300 ${className}`;
    if (disabled) {
      inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed bg-gray-100`;
    } else if (error) {
      inputClasses += ` text-error-800 border-error-500 focus:ring-1 focus:ring-error-500/20`;
    } else if (success) {
      inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300`;
    }
    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={inputClasses}
          {...rest}
        />
        {hint && (
          <p
            className={`mt-1.5 text-xs ${
              error
                ? "text-[#f04438]"
                : success
                ? "text-success-500"
                : "text-gray-500"
            }`}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input; 