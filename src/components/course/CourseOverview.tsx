'use client';
import React from 'react';

interface CourseData {
  title: string;
  institution: string;
  category: string;
  students: number;
  modules: number;
  duration: string;
  rating: number;
  reviews: number;
  status: string;
}

interface CourseOverviewProps {
  course: CourseData;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ course }) => {
  return (
    <div className="space-y-4">
      {/* Título do curso */}
      <h1 className="text-2xl font-bold text-gray-900">
        {course.title}
      </h1>

      {/* Informações básicas */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="font-medium">{course.institution}</span>
        <span>•</span>
        <span>{course.category}</span>
      </div>

      {/* Estatísticas do curso */}
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{course.students} Alunos</span>
        </div>

        <div className="flex items-center gap-1">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>{course.modules} Módulos</span>
        </div>

        <div className="flex items-center gap-1">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{course.duration}</span>
        </div>

        <div className="flex items-center gap-1">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{course.rating} ({course.reviews} Avaliações)</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            {course.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview; 