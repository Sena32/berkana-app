import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  institution: z.string().min(2, 'Instituição obrigatória'),
  notify: z.boolean(),
});

export const passwordSchema = z.object({
  password: z.string().min(6, 'Senha atual obrigatória'),
  newPassword: z.string().min(6, 'Nova senha obrigatória'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>; 