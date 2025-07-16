import type { EventCardProps } from '@/components/event/EventCard';

export const mockEvents: EventCardProps[] = [
  {
    title: 'Aulão ao vivo Licitações',
    date: '25 de março',
    time: '20:00',
    description: 'Material será enviado por e-mail após o evento.',
    status: 'webinário',
    institution: 'SENASP',
  },
  {
    title: 'Gestão de Segurança',
    date: '1 de abril',
    time: '17:00',
    description: 'Webinário sobre gestão de segurança pública.',
    status: 'em breve',
    institution: 'SENASP',
  },
  {
    title: 'Combate à Corrupção: Gestão de Riscos',
    date: '10 de abril',
    time: '19:00',
    description: 'Evento especial para alunos credenciados.',
    status: 'em breve',
    institution: 'Berkana',
  },
]; 