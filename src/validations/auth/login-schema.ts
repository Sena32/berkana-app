import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'E-mail institucional é obrigatório.' })
    .email('Informe um e-mail institucional válido.'),
  password: z
    .string({ required_error: 'Senha é obrigatória.' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export type LoginSchema = z.infer<typeof loginSchema>; 