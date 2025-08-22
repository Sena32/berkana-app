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

// Interface para configurações de formatação de moeda
export interface CurrencyFormatOptions {
  style?: 'currency' | 'decimal';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  compactDisplay?: 'short' | 'long';
}

/**
 * Formata um valor como moeda
 * @param value - Valor numérico a ser formatado
 * @param language - Código de idioma (ex: 'pt-BR', 'en-US', 'de-DE')
 * @param options - Configurações opcionais de formatação
 * @returns String formatada da moeda
 */
export function formatCurrency(
  value: number,
  language: string = 'pt-BR',
  options: CurrencyFormatOptions = {}
): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };

  // Ajustar moeda baseada no idioma se não especificada
  if (!options.currency) {
    switch (language) {
      case 'pt-BR':
        defaultOptions.currency = 'BRL';
        break;
      case 'en-US':
        defaultOptions.currency = 'USD';
        break;
      case 'de-DE':
        defaultOptions.currency = 'EUR';
        break;
      default:
        defaultOptions.currency = 'BRL';
    }
  }

  try {
    return new Intl.NumberFormat(language, defaultOptions).format(value);
  } catch (error) {
    console.error('Erro ao formatar moeda:', error);
    // Fallback para formatação básica
    return `${defaultOptions.currency} ${value.toFixed(2)}`;
  }
}

/*
 * Exemplos de uso da função formatCurrency:
 * 
 * // Formatação básica em português brasileiro
 * formatCurrency(1234.56) // "R$ 1.234,56"
 * 
 * // Formatação em inglês americano
 * formatCurrency(1234.56, 'en-US') // "$1,234.56"
 * 
 * // Formatação em alemão
 * formatCurrency(1234.56, 'de-DE') // "1.234,56 €"
 * 
 * // Com configurações personalizadas
 * formatCurrency(1234.56, 'pt-BR', {
 *   minimumFractionDigits: 0,
 *   maximumFractionDigits: 0
 * }) // "R$ 1.235"
 * 
 * // Formatação compacta
 * formatCurrency(1234567, 'pt-BR', {
 *   notation: 'compact',
 *   compactDisplay: 'short'
 * }) // "R$ 1,2M"
 */ 