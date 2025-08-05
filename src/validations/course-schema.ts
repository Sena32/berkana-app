import { z } from 'zod';

const hourRegex = /^\d{1,2}:[0-5]\d$/;

export const courseSchema = z.object({
  title: z.string().min(2, 'Título do curso é obrigatório'),
  institution: z.string().min(2, 'Instituição é obrigatória'),
  modules: z.number().min(1, 'Informe o número de módulos'),
  // Trocar de duration para hours, string, formato HH:MM
  hours: z.string()
    .regex(hourRegex, 'Formato deve ser HH:MM')
    .refine(val => {
      if (!hourRegex.test(val)) return false;
      const [h, m] = val.split(':').map(Number);
      return h >= 0 && m >= 0 && m < 60;
    }, 'Informe uma carga horária válida (ex: 40:00)'),
  rating: z.number().min(0).max(5),
  status: z.enum(['in-progress', 'open', 'completed', 'locked'], {
    required_error: 'Status é obrigatório',
  }),
  image: z.string().url('URL da imagem inválida'),
  description: z.string().min(10, 'Descrição é obrigatória'),
});

export type CourseSchema = z.infer<typeof courseSchema>; 