import type { CourseCardProps } from '../components/course/CourseCard';

export const mockCourses: CourseCardProps[] = [
  {
    id: '1',
    name: 'Armamento Munição e Tiro',
    institution: 'SENASP',
    modules: 5,
    hours: '1h 30m',
    rating: 4.5,
    isActive: true,
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    description: 'Curso sobre armamento, munição e técnicas de tiro.'
  },
  {
    id: '2',
    name: 'Fiscalização, Transporte e Direção',
    institution: 'SENASP',
    modules: 5,
    hours: '1h 30m',
    rating: 4.5,
    isActive: true,
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    description: 'Curso sobre fiscalização, transporte e direção segura.'
  },
  {
    id: '3',
    name: 'Língua e Comunicação',
    institution: 'SENASP',
    modules: 5,
    hours: '1h 30m',
    rating: 4.5,
    isActive: false,
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    description: 'Curso de comunicação e linguagem para profissionais.'
  },
  {
    id: '4',
    name: 'Gestão de Pessoas',
    institution: 'Berkana',
    modules: 8,
    hours: '2h 00m',
    rating: 4.8,
    isActive: true,
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    description: 'Curso sobre gestão de equipes e liderança.'
  },
  {
    id: '5',
    name: 'Saúde Mental no Trabalho',
    institution: 'Berkana',
    modules: 4,
    hours: '1h 10m',
    rating: 4.2,
    isActive: true,
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    description: 'Curso sobre saúde mental e bem-estar no ambiente de trabalho.'
  },
  {
    id: '6',
    name: 'Investigação Criminal',
    institution: 'SENASP',
    modules: 6,
    hours: '1h 45m',
    rating: 4.7,
    isActive: false,
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    description: 'Curso sobre técnicas de investigação criminal.'
  }
]; 