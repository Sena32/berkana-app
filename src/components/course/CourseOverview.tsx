'use client';
import { ClockIcon, BookOpenIcon, StarIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface CourseData {
  title: string;
  institution: string;
  categoryName: string;
  students: number;
  modulesCount: number;
  duration: string;
  rating: number;
  reviews: number;
  level: string;
}

interface CourseOverviewProps {
  course: CourseData;
  isPublic: boolean;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ course, isPublic }) => {
  return (
    <div className="space-y-4">
      {/* Título do curso */}
      <h1 className="text-2xl font-bold text-gray-900">
        {course.title}
      </h1>

      {/* Informações básicas */}
      <div className="flex items-center gap-2 text-sm text-gray-600 justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">{course.institution}</span>
          <span>{course.categoryName}</span>
        </div>
        <div className="flex items-center gap-1 min-w-0">
          <StarIcon className="w-4 h-4 text-yellow-400" fill='currentColor'/>
          <span >{course.rating} ({course.reviews} Avaliações)</span>
        </div>
      </div>

      {/* Estatísticas do curso */}
      <div className="flex items-center text-sm text-gray-600 justify-between">
        <div className='flex items-center gap-6 min-w-0'>
          <div className="flex items-center gap-1">
            <UserIcon className="w-4 h-4"/>
            <span>{course.students} Alunos</span>
          </div>

          <div className="flex items-center gap-1">
            <BookOpenIcon className="w-4 h-4"/>
            <span>{course.modulesCount} Módulos</span>
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4"/>
            <span>{course.duration}</span>
          </div>
        </div>
        {isPublic && (
          <div className="flex items-center gap-1">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {course.level}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseOverview; 