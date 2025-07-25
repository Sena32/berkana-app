import React from 'react';
import PublicHeader from '@/components/layout/PublicHeader';
import HeroSection from '@/components/home/HeroSection';
import CoursesSection from '@/components/home/CoursesSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import WhyBerkanaSection from '@/components/home/WhyBerkanaSection';
import InstructorList from '@/components/home/InstructorList';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import FAQAccordion from '@/components/home/FAQAccordion';
import Footer from '@/components/layout/Footer';
import PartnersSection from '@/components/home/PartnersSection';
import CallToAction from '@/components/home/CallToAction';
import { CourseViewModel } from '@/viewmodels/course/CourseViewModel';
import Alert from '@/components/common/Alert';

export const metadata = {
  title: 'Berkana Academy | Desenvolva suas habilidades',
  description: 'Capacitação de qualidade para servidores públicos e colaboradores de instituições privadas. Escolha um curso, aprenda no seu ritmo e conquiste novas oportunidades!',
};

// Função utilitária para buscar cursos com tratamento de erro
async function getCoursesSafe() {
  try {
    const courses = await CourseViewModel.getInstance().listCourses(1);
    return { courses: courses?.courses || [], error: null };
  } catch (error: any) {
    console.error('Erro ao carregar cursos na home:', error);
    return { courses: [], error: error?.message || 'Erro ao carregar cursos. Tente novamente mais tarde.' };
  }
}

export default async function HomePage() {
  const { courses, error } = await getCoursesSafe();

  return (
    <main className="min-h-screen flex flex-col ">
      <PublicHeader />
      {/* Exibe erro amigável se houver */}
      <HeroSection />
      <PartnersSection />
      <CoursesSection courses={courses} />
      <CategoryGrid />
      <WhyBerkanaSection />
      <InstructorList />
      <TestimonialsCarousel />
      <FAQAccordion />
      <CallToAction />
      <Footer />
    </main>
  );
}
