import React from 'react';
import CourseList from '@/components/course/CourseList';
import { mockCourses } from '@/mocks/course-mock';
import Link from '../common/Link';

interface CoursesSectionProps {
  courses?: any[]; // Tipar corretamente depois
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ courses }) => {
  const courseList = courses && courses.length > 0 ? courses : mockCourses;
  return (
    <section className="max-w-7xl mx-auto w-full py-10 px-4 sm:px-8">
      <span className="text-[#2447F9] font-normal text-sm">Siga seu sonho</span>
      <h2 className="text-2xl md:text-4xl font-bold text-title-section mb-2 mt-1">Capacitações em alta: <p>Escolha o seu próximo curso</p></h2>
      <CourseList courses={courseList} />
      <div className="flex justify-center mt-8">
        <Link type="link" variant="button-primary" size="md" className="min-w-[170px]" href="/cursos">Ver mais cursos</Link>
      </div>
    </section>
  );
};

export default CoursesSection; 