'use client';
import React, { useState } from 'react';
import CourseList from './CourseList';
import CourseCardWithProgress from './CourseCardWithProgress';
import CourseCard from './CourseCard';
import { CourseCardProps } from './CourseCard';
import { CourseCardWithProgressProps } from './CourseCardWithProgress';
import { CourseWithOptionalProgress } from './CourseList';
import { useCourseNavigation } from '@/hooks/useCourseNavigation';

const MyCoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mockados para cursos em progresso
  const coursesInProgress: CourseWithOptionalProgress[] = [
    {
      id: '1',
      name: 'Armamento Munição e Tiro',
      institution: 'SENASP',
      rating: 4.5,
      progress: {
        completed: 3,
        total: 5,
        percentage: 60
      },
      image: '/images/courses/shooting-range.jpg',
      progressColor: 'green',
      hours: '1h 30m',
      isActive: true,
      thumbnail: '',
      description: 'Armamento Munição e Tiro'
    },
    {
      id: '2',
      name: 'Fiscalização, Transporte e Direção',
      institution: 'SENASP',
      rating: 4.5,
      progress: {
        completed: 1,
        total: 5,
        percentage: 20
      },
      image: '/images/courses/transport.jpg',
      progressColor: 'green',
      hours: '1h 30m',
      isActive: true,
      thumbnail: '',
      description: 'Fiscalização, Transporte e Direção'
    },
    {
      id: '3',
      name: 'Funções, Técnicas e Procedimentos em Segurança...',
      institution: 'SENASP',
      rating: 4.5,
      progress: {
        completed: 1,
        total: 5,
        percentage: 20
      },
      image: '/images/courses/safety.jpg',
      progressColor: 'green',
      hours: '1h 30m',
      isActive: true,
      thumbnail: '',
      description: 'Funções, Técnicas e Procedimentos em Segurança...'
    }
  ];

  // Dados mockados para cursos recomendados
  const recommendedCourses: CourseCardProps[] = [
    {
      id: '4',
      name: 'Yoga para iniciantes',
      institution: 'SENASP',
      modules: 5,
      hours: '1h 30m',
      rating: 4.5,
      isActive: true,
      thumbnail: '',
      image: '/images/courses/yoga.jpg',
      description: 'Qualidade de Vida, Bem-Estar e Saúde'
    },
    {
      id: '5',
      name: 'Primeiros Socorros no Ambiente Corporativo',
      institution: 'Berkana',
      modules: 5,
      hours: '1h 30m',
      rating: 4.5,
      isActive: true,
      thumbnail: '',
      image: '/images/courses/first-aid.jpg',
      description: 'Salvamento e Resgate e Defesa Civil'
    },
    {
      id: '6',
      name: 'Gestão de Conflitos e Eventos Críticos',
      institution: 'Berkana',
      modules: 5,
      hours: '1h 30m',
      rating: 4.5,
      isActive: true,
      thumbnail: '',
      image: '/images/courses/conflict.jpg',
      description: 'Gestão de Conflitos e Eventos Críticos'
    }
  ];

  // Dados mockados para cursos concluídos
  const completedCourses: CourseCardWithProgressProps[] = [
    {
      id: '7',
      name: 'Armamento Munição e Tiro',
      institution: 'SENASP',
      rating: 4.5,
      progress: {
        completed: 5,
        total: 5,
        percentage: 100
      },
      image: '/images/courses/shooting-range.jpg',
      progressColor: 'green'
    },
    {
      id: '8',
      name: 'Fiscalização, Transporte e Direção',
      institution: 'SENASP',
      rating: 4.5,
      progress: {
        completed: 5,
        total: 5,
        percentage: 100
      },
      image: '/images/courses/transport.jpg',
      progressColor: 'green'
    },
    {
      id: '9',
      name: 'Funções, Técnicas e Procedimentos em Segurança...',
      institution: 'SENASP',
      rating: 4.5,
      progress: {
        completed: 5,
        total: 5,
        percentage: 100
      },
      image: '/images/courses/safety.jpg',
      progressColor: 'green'
    }
  ];

  // Filtrar cursos baseado no termo de busca
  const filterCourses = (courses: any[]) => {
    if (!searchTerm) return courses;
    
    return courses.filter(course => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.institution.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredInProgress = filterCourses(coursesInProgress);
  const filteredRecommended = filterCourses(recommendedCourses);
  const filteredCompleted = filterCourses(completedCourses);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Meus cursos</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Buscar por curso ou instituição"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5D334] focus:border-[#B5D334]"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Continue seus estudos */}
      {filteredInProgress.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <CourseList 
            courses={filteredInProgress}
            title="Continue seus estudos"
            cardType="withProgress"
            navigation={useCourseNavigation({
              baseUrl: '/aluno/cursos',
              useRouter: true,
            })}
          />
        </div>
      )}

      {/* Cursos para você */}
      {filteredRecommended.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <CourseList 
            courses={filteredRecommended}
            title="Cursos para você"
            cardType="default"
            navigation={useCourseNavigation({
              baseUrl: '/aluno/cursos',
              useRouter: true,
            })}
          />
        </div>
      )}

      {/* Cursos concluídos */}
      {filteredCompleted.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <CourseList 
            courses={filteredCompleted}
            title="Cursos concluídos"
            cardType="withProgress"
            navigation={useCourseNavigation({
              baseUrl: '/aluno/cursos',
              useRouter: true,
            })}
          />
        </div>
      )}

      {/* Estado vazio */}
      {filteredInProgress.length === 0 && filteredRecommended.length === 0 && filteredCompleted.length === 0 && (
        <div className="text-center py-12">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum curso encontrado</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Tente ajustar sua busca ou explore nossos cursos disponíveis.' : 'Você ainda não possui cursos. Comece explorando nossa biblioteca!'}
          </p>
          <a
            href="/aluno/explorar-cursos"
            className="inline-flex items-center px-4 py-2 bg-[#B5D334] text-gray-900 font-medium rounded-lg hover:bg-[#A0BC2C] transition-colors"
          >
            Explorar cursos
          </a>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage; 