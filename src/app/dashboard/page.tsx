import StudentSidebar from '@/components/layout/StudentSidebar';
import DashboardStats from '@/components/dashboard/DashboardStats';
import CourseList from '@/components/course/CourseList';
import EventCard from '@/components/event/EventCard';
import { mockCourses } from '@/mocks/course-mock';
import { mockEvents } from '@/mocks/event-mock';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Dashboard do Aluno | Berkana Academy',
  description: 'Acompanhe seu progresso, cursos e eventos na Berkana Academy.',
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex flex-col ">
      <div className="flex min-h-screen">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header/topbar pode ser adicionado aqui se necessário */}
          <div className="max-w-7xl mx-auto w-full py-8 px-4 sm:px-8">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Olá, Maria</h1>
            <p className="text-text-secondary mb-6">Vamos aprender algo novo hoje!</p>
            <DashboardStats />
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Continue seus estudos</h2>
              <CourseList courses={mockCourses.slice(0, 2)} />
            </section>
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Cursos para você</h2>
              <CourseList courses={mockCourses.slice(1, 4)} />
            </section>
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Cursos gratuitos</h2>
              <CourseList courses={mockCourses.slice(0, 3)} />
            </section>
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Seus eventos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockEvents.map((event) => (
                  <EventCard key={event.title} {...event} />
                ))}
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
} 