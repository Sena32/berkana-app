import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  institution: z
    .string()
    .min(2, 'Instituição deve ter pelo menos 2 caracteres')
    .max(100, 'Instituição deve ter no máximo 100 caracteres'),
  notify: z.boolean(),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, 'Senha atual deve ter pelo menos 6 caracteres'),
  newPassword: z
    .string()
    .min(6, 'Nova senha deve ter pelo menos 6 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter letra maiúscula, minúscula e número'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>; 