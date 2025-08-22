import { formatCurrency } from './utils';

/**
 * Exemplos de uso da função formatCurrency
 * Este arquivo demonstra como usar a função em diferentes cenários
 */

// Exemplo 1: Formatação básica em português brasileiro
export const exemploBasico = () => {
  const valor = 1234.56;
  return formatCurrency(valor); // "R$ 1.234,56"
};

// Exemplo 2: Formatação em inglês americano
export const exemploIngles = () => {
  const valor = 1234.56;
  return formatCurrency(valor, 'en-US'); // "$1,234.56"
};

// Exemplo 3: Formatação em alemão
export const exemploAlemao = () => {
  const valor = 1234.56;
  return formatCurrency(valor, 'de-DE'); // "1.234,56 €"
};

// Exemplo 4: Com configurações personalizadas (sem decimais)
export const exemploSemDecimais = () => {
  const valor = 1234.56;
  return formatCurrency(valor, 'pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }); // "R$ 1.235"
};

// Exemplo 5: Formatação compacta para valores grandes
export const exemploCompacto = () => {
  const valor = 1234567;
  return formatCurrency(valor, 'pt-BR', {
    notation: 'compact',
    compactDisplay: 'short'
  }); // "R$ 1,2M"
};

// Exemplo 6: Formatação com moeda específica
export const exemploMoedaEspecifica = () => {
  const valor = 1234.56;
  return formatCurrency(valor, 'pt-BR', {
    currency: 'USD'
  }); // "US$ 1.234,56"
};

// Exemplo 7: Formatação para diferentes valores
export const exemplosVariados = () => {
  const valores = [0, 10.5, 100, 1000.99, 1000000];
  
  return valores.map(valor => ({
    valor,
    formatado: formatCurrency(valor, 'pt-BR')
  }));
};

// Exemplo 8: Formatação para diferentes idiomas
export const exemplosIdiomas = () => {
  const valor = 1234.56;
  const idiomas = ['pt-BR', 'en-US', 'de-DE', 'es-ES', 'fr-FR'];
  
  return idiomas.map(idioma => ({
    idioma,
    formatado: formatCurrency(valor, idioma)
  }));
}; 