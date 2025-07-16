import PublicHeader from '@/components/layout/PublicHeader';
import CourseFilters from '@/components/course/CourseFilters';
import CourseList from '@/components/course/CourseList';
import { mockCourses } from '@/mocks/course-mock';
import Footer from '@/components/layout/Footer';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import CallToAction from '@/components/home/CallToAction';

export const metadata = {
  title: 'Explorar cursos | Berkana Academy',
  description: 'Encontre cursos gratuitos e exclusivos para sua carreira na Berkana Academy.',
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <section className="max-w-7xl mx-auto w-full py-10 px-4 sm:px-8">
        <h1 className="text-2xl md:text-4xl font-bold text-text-primary mb-2">Explorar cursos</h1>
        <p className="text-text-secondary text-base mb-6">Busque cursos por área, instituição ou palavra-chave.</p>
        <CourseFilters />
        <CourseList courses={mockCourses} />
        <div className="flex justify-center mt-8">
          <button className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">Ver mais cursos</button>
        </div>
      </section>
      <TestimonialsCarousel/>        
      <CallToAction/>
      <Footer />
    </main>
  );
} 