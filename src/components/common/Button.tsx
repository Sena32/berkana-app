import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline" | "success";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "px-4 py-3 text-sm h-10",
    md: "px-5 py-3.5 text-base h-12 font-semibold",
  };
  const variantClasses = {
    primary:
      "bg-[#B5D334] text-[#16285E] font-bold rounded-lg shadow-theme-xs hover:bg-[#A0BC2C] disabled:bg-[#E3F2A7] disabled:text-gray-400 transition-colors",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    success:
      "bg-green-500 text-white shadow-theme-xs hover:bg-green-600 disabled:bg-green-300",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-70" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      style={{ minHeight: size === "md" ? 48 : 40 }}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button; 