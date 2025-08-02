'use client';
import React, { useState } from 'react';
import CourseCard, { CourseCardProps } from './CourseCard';
import CourseCardWithProgress, { CourseCardWithProgressProps } from './CourseCardWithProgress';

// Tipo para cursos com progresso opcional
export interface CourseWithOptionalProgress extends Omit<CourseCardProps, 'id'> {
  id: string;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  progressColor?: 'green' | 'orange' | 'blue';
  certificateLink?: string;
}

export type CardType = 'default' | 'withProgress';

export interface NavigationConfig {
  enabled: boolean;
  baseUrl?: string;
  useRouter?: boolean;
  onClick?: (id: string) => void;
}

interface CourseListProps {
  courses: (CourseCardProps | CourseCardWithProgressProps | CourseWithOptionalProgress)[];
  title?: string;
  showPagination?: boolean;
  cardType?: CardType;
  className?: string;
  itemsPerPage?: number;
  // Props de navegação
  navigation?: NavigationConfig;
}

const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  title, 
  showPagination = false, 
  cardType = 'default',
  className = '',
  itemsPerPage = 3,
  navigation
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  const renderCard = (course: CourseCardProps | CourseCardWithProgressProps | CourseWithOptionalProgress, index: number) => {
    if (cardType === 'withProgress') {
      // Se o curso tem progresso, usar CourseCardWithProgress
      if ('progress' in course && course.progress) {
        return (
          <CourseCardWithProgress 
            key={course.id} 
            {...(course as CourseCardWithProgressProps)}
            navigation={navigation}
          />
        );
      }
      // Se não tem progresso, usar CourseCard normal
      return (
        <CourseCard 
          key={course.id} 
          {...(course as CourseCardProps)}
          navigation={navigation}
        />
      );
    }
    
    return (
      <CourseCard 
        key={course.id} 
        {...(course as CourseCardProps)}
        navigation={navigation}
      />
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header com título e paginação */}
      {(title || showPagination) && (
        <div className="flex items-center justify-between">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          )}
          
          {showPagination && totalPages > 1 && (
            <div className="flex gap-2">
              <button 
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Próxima página"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Grid de cards */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${itemsPerPage} gap-4`}>
        {currentCourses.map((course, index) => renderCard(course, index))}
      </div>

      {/* Indicadores de página (opcional) */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage ? 'bg-[#B5D334]' : 'bg-gray-300'
              }`}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList; 