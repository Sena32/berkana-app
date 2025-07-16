import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(2, 'Título do curso é obrigatório'),
  institution: z.string().min(2, 'Instituição é obrigatória'),
  modules: z.number().min(1, 'Informe o número de módulos'),
  duration: z.string().min(2, 'Duração é obrigatória'),
  rating: z.number().min(0).max(5),
  status: z.enum(['in-progress', 'open', 'completed', 'locked'], {
    required_error: 'Status é obrigatório',
  }),
  image: z.string().url('URL da imagem inválida'),
  description: z.string().min(10, 'Descrição é obrigatória'),
});

export type CourseSchema = z.infer<typeof courseSchema>; 