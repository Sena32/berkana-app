'use client'
import React, { useState } from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  title?: string;
  message: string;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
  defaultVisible?: boolean;
}

const variantStyles = {
  success: 'bg-green-50 border-green-200 text-green-700',
  error: 'bg-red-50 border-red-200 text-red-700',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  info: 'bg-blue-50 border-blue-200 text-blue-700',
};

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  variant = 'info',
  onClose,
  className = '',
  defaultVisible = true,
}) => {
  const [visible, setVisible] = useState(defaultVisible);

  if (!visible) return null;

  return (
    <div
      className={`w-full mx-auto my-4 p-4 border rounded-lg flex items-start gap-3 relative ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold text-sm mb-1">{title}</div>
        )}
        <div className="text-sm break-words">{message}</div>
      </div>
      <button
        type="button"
        aria-label="Fechar alerta"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        className="absolute top-2 right-2 p-1 rounded hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        <img src="/images/icons/close.svg" alt="Fechar" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Alert; 