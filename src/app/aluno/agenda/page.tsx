import StudentLayout from '@/components/layout/StudentLayout';
import AgendaPage from '@/components/event/AgendaPage';

export const metadata = {
  title: 'Agenda e Eventos | Berkana Academy',
  description: 'Veja seus próximos eventos, webinários e aulas na Berkana Academy.',
};

export default function AgendaPageRoute() {
  return (
    <StudentLayout>
      <AgendaPage />
    </StudentLayout>
  );
} 