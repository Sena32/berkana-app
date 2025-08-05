import { z } from 'zod';

// Função para validar CPF
const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
};

// Função para formatar CPF
const formatCPF = (cpf: string): string => {
  const numbers = cpf.replace(/\D/g, '');
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  } else if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  } else {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }
};

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('Digite um e-mail válido'),
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z
    .string({ required_error: 'Sobrenome é obrigatório' })
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  cpf: z
    .string({ required_error: 'CPF é obrigatório' })
    .min(11, 'CPF deve ter pelo menos 11 dígitos')
    .max(14, 'CPF deve ter no máximo 14 caracteres')
    .transform((cpf) => {
      // Remove formatação e valida
      const cleanCPF = cpf.replace(/\D/g, '');
      if (!validateCPF(cleanCPF)) {
        throw new Error('CPF inválido');
      }
      // Retorna o CPF formatado
      return formatCPF(cleanCPF);
    }),
  institution: z
    .string({ required_error: 'Instituição é obrigatória' })
    .min(2, 'Instituição deve ter pelo menos 2 caracteres'),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string({ required_error: 'Confirmação de senha é obrigatória' }),
  acceptTerms: z
    .boolean().refine(val => val, { message: 'Você deve aceitar os termos de uso.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type RegisterSchema = z.infer<typeof registerSchema>; 