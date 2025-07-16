import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('Digite um e-mail válido'),
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
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