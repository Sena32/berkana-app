import StudentSidebar from '@/components/layout/StudentSidebar';
import EventCard from '@/components/event/EventCard';
import { mockEvents } from '@/mocks/event-mock';
import Footer from '@/components/layout/Footer';
import EventList from '@/components/event/EventList';

const mockFilters = [
  { id: 'all', name: 'Todos' },
  { id: 'webinario', name: 'Webinário' },
  { id: 'em-breve', name: 'Em breve' },
];

export const metadata = {
  title: 'Agenda e Eventos | Berkana Academy',
  description: 'Veja seus próximos eventos, webinários e aulas na Berkana Academy.',
};

export default function AgendaPage() {
  return (
    <main className="min-h-screen flex flex-col ">
      <div className="flex min-h-screen">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <div className="max-w-7xl mx-auto w-full py-8 px-4 sm:px-8">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Agenda e eventos</h1>
            <p className="text-text-secondary mb-6">Busque por curso ou instituição</p>
            {/* Filtros mockados */}
            <div className="flex flex-wrap gap-2 mb-8">
              {mockFilters.map((f) => (
                <button key={f.id} className="px-4 py-2 rounded-lg bg-white border border-border text-sm text-text-secondary hover:bg-primary/10 transition-colors">
                  {f.name}
                </button>
              ))}
            </div>
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Seus próximos eventos</h2>
              <EventList 
                events={mockEvents}
                title="Seus próximos eventos"
                showViewAll={false}
                showExploreButton={false}
              />
            </section>
            <section className="mb-10">
              <EventList 
                events={mockEvents}
                title="Em breve" 
                showViewAll={false}
                showExploreButton={false}
              />
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
} 