import { Course, CourseLevel } from '@/types/course';

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Armamento Munição e Tiro',
    description: 'Curso sobre armamento, munição e técnicas de tiro.',
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    institutionId: 'inst-1',
    categoryId: 'cat-1',
    unitCertification: 'Certificação SENASP',
    level: CourseLevel.GRATUITO,
    slug: 'armamento-municao-tiro',
    hours: '1h 30m',
    price: '0.00',
    instructorId: 'instr-1',
    isPublic: true,
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    instructor: {
      id: 'instr-1',
      name: 'Instrutor SENASP'
    },
    category: {
      id: 'cat-1',
      name: 'Segurança'
    },
    institution: {
      id: 'inst-1',
      name: 'SENASP'
    },
    modulesCount: 5,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Fiscalização, Transporte e Direção',
    description: 'Curso sobre fiscalização, transporte e direção segura.',
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    institutionId: 'inst-1',
    categoryId: 'cat-1',
    unitCertification: 'Certificação SENASP',
    level: CourseLevel.GRATUITO,
    slug: 'fiscalizacao-transporte-direcao',
    hours: '1h 30m',
    price: '0.00',
    instructorId: 'instr-1',
    isPublic: true,
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    instructor: {
      id: 'instr-1',
      name: 'Instrutor SENASP'
    },
    category: {
      id: 'cat-1',
      name: 'Segurança'
    },
    institution: {
      id: 'inst-1',
      name: 'SENASP'
    },
    modulesCount: 5,
    rating: 4.5
  },
  {
    id: '3',
    name: 'Língua e Comunicação',
    description: 'Curso de comunicação e linguagem para profissionais.',
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    institutionId: 'inst-1',
    categoryId: 'cat-1',
    unitCertification: 'Certificação SENASP',
    level: CourseLevel.GRATUITO,
    slug: 'lingua-comunicacao',
    hours: '1h 30m',
    price: '0.00',
    instructorId: 'instr-1',
    isPublic: true,
    isActive: false,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    instructor: {
      id: 'instr-1',
      name: 'Instrutor SENASP'
    },
    category: {
      id: 'cat-1',
      name: 'Segurança'
    },
    institution: {
      id: 'inst-1',
      name: 'SENASP'
    },
    modulesCount: 5,
    rating: 4.5
  },
  {
    id: '4',
    name: 'Gestão de Pessoas',
    description: 'Curso sobre gestão de equipes e liderança.',
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    institutionId: 'inst-2',
    categoryId: 'cat-1',
    unitCertification: 'Certificação Berkana',
    level: CourseLevel.PAGO,
    slug: 'gestao-pessoas',
    hours: '2h 00m',
    price: '99.90',
    instructorId: 'instr-2',
    isPublic: true,
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    instructor: {
      id: 'instr-2',
      name: 'Instrutor Berkana'
    },
    category: {
      id: 'cat-1',
      name: 'Segurança'
    },
    institution: {
      id: 'inst-2',
      name: 'Berkana'
    },
    modulesCount: 8,
    rating: 4.8
  },
  {
    id: '5',
    name: 'Saúde Mental no Trabalho',
    description: 'Curso sobre saúde mental e bem-estar no ambiente de trabalho.',
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    institutionId: 'inst-2',
    categoryId: 'cat-1',
    unitCertification: 'Certificação Berkana',
    level: CourseLevel.PAGO,
    slug: 'saude-mental-trabalho',
    hours: '1h 10m',
    price: '79.90',
    instructorId: 'instr-2',
    isPublic: true,
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    instructor: {
      id: 'instr-2',
      name: 'Instrutor Berkana'
    },
    category: {
      id: 'cat-1',
      name: 'Segurança'
    },
    institution: {
      id: 'inst-2',
      name: 'Berkana'
    },
    modulesCount: 4,
    rating: 4.2
  },
  {
    id: '6',
    name: 'Investigação Criminal',
    description: 'Curso sobre técnicas de investigação criminal.',
    thumbnail: '/images/curso.png',
    image: '/images/curso.png',
    institutionId: 'inst-1',
    categoryId: 'cat-1',
    unitCertification: 'Certificação SENASP',
    level: CourseLevel.GRATUITO,
    slug: 'investigacao-criminal',
    hours: '1h 45m',
    price: '0.00',
    instructorId: 'instr-1',
    isPublic: true,
    isActive: false,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    instructor: {
      id: 'instr-1',
      name: 'Instrutor SENASP'
    },
    category: {
      id: 'cat-1',
      name: 'Segurança'
    },
    institution: {
      id: 'inst-1',
      name: 'SENASP'
    },
    modulesCount: 6,
    rating: 4.7
  }
]; 