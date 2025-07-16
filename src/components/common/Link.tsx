import React, { ReactNode } from "react";
import NextLink from "next/link";

interface LinkProps {
  children: ReactNode;
  href?: string;
  type: "link" | "button";
  variant: "button-primary" | "button-outline" | "button-success" | "link-primary" | "link-secondary";
  size?: "sm" | "md";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  disabled?: boolean;
  external?: boolean;
  target?: "_blank" | "_self";
}

const Link: React.FC<LinkProps> = ({
  children,
  href,
  type,
  variant,
  size = "md",
  startIcon,
  endIcon,
  className = "",
  disabled = false,
  external = false,
  target = "_self",
}) => {
  // Size Classes (mesmo do Button)
  const sizeClasses = {
    sm: "px-4 py-3 text-sm h-10",
    md: "px-5 py-3.5 text-base h-12 font-semibold",
  };

  // Variant Classes
  const variantClasses = {
    // Button variants (mesmo do Button)
    "button-primary":
      "bg-[#B5D334] text-[#16285E] font-bold rounded-lg shadow-theme-xs hover:bg-[#A0BC2C] disabled:bg-[#E3F2A7] disabled:text-gray-400 transition-colors",
    "button-outline":
      "bg-white  rounded-lg text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    "button-success":
      "bg-green-500  rounded-lg text-white shadow-theme-xs hover:bg-green-600 disabled:bg-green-300",
    // Link variants
    "link-primary":
      "text-[#16285E] hover:text-[#A0BC2C] underline-offset-4 hover:underline transition-colors",
    "link-secondary":
      "text-gray-600 hover:text-gray-800 underline-offset-4 hover:underline transition-colors",
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 transition ${className} ${
    sizeClasses[size]
  } ${variantClasses[variant]} ${
    disabled ? "cursor-not-allowed opacity-70" : ""
  }`;

  // Render como link interno (Next.js)
  if (type === "link" && href && href.startsWith("/")) {
    return (
      <NextLink
        href={href}
        className={baseClasses}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        style={{ minHeight: size === "md" ? 48 : 40 }}
      >
        {startIcon && <span className="flex items-center">{startIcon}</span>}
        {children}
        {endIcon && <span className="flex items-center">{endIcon}</span>}
      </NextLink>
    );
  }

  // Render como link externo
  if (type === "link" && href) {
    return (
      <a
        href={href}
        className={baseClasses}
        target={external ? target : undefined}
        rel={external && target === "_blank" ? "noopener noreferrer" : undefined}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        style={{ minHeight: size === "md" ? 48 : 40 }}
      >
        {startIcon && <span className="flex items-center">{startIcon}</span>}
        {children}
        {endIcon && <span className="flex items-center">{endIcon}</span>}
      </a>
    );
  }

  // Caso não tenha href, renderiza um span estilizado (fallback)
  return (
    <span
      className={baseClasses}
      tabIndex={-1}
      aria-disabled={true}
      style={{ minHeight: size === "md" ? 48 : 40 }}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </span>
  );
};

export default Link; 