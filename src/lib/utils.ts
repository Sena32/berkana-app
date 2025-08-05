import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hook para detectar se está no servidor
export function isServer() {
  return typeof window === 'undefined';
}

// Hook para detectar se está no cliente
export function isClient() {
  return typeof window !== 'undefined';
} 