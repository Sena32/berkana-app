"use client";
import React from "react";

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  onItemClick?: () => void;
  tag?: "button" | "a";
  href?: string;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  onItemClick,
  tag = "button",
  href,
  className = "",
}) => {
  const handleClick = () => {
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  if (tag === "a" && href) {
    return (
      <a
        href={href}
        className={`block w-full text-left ${className}`}
        onClick={onItemClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`block w-full text-left ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};