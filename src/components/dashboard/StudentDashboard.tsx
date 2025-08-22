'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import CourseList from '@/components/course/CourseList';
import CourseCardWithProgress from '@/components/course/CourseCardWithProgress';
import EventList from '@/components/event/EventList';
import { Event } from '@/types/event';
import { Course, CourseLevel } from '@/types/course';
import { CourseWithOptionalProgress } from '@/components/course/CourseList';
import { CourseViewModel } from '@/viewmodels/course/CourseViewModel';
import { useCourseNavigation } from '@/hooks/useCourseNavigation';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [coursesInProgress, setCoursesInProgress] = useState<CourseWithOptionalProgress[]>([]);
  const [freeCourses, setFreeCourses] = useState<CourseWithOptionalProgress[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<CourseWithOptionalProgress[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { courses: coursesData } = await CourseViewModel.getInstance().listPublicCourses(1);
      
      // Adicionar progresso mockado para cursos em andamento
      const coursesWithMockProgress = coursesData.map((course, index) => ({
        ...course,
        modulesCount: 3,
        progress: {
          completed: Math.floor(Math.random() * 3) + 1, // 1 a modulesCount
          total: 3,
          percentage: Math.floor(Math.random() * 90) + 10 // 10% a 99%
        },
        progressColor: ['green'][index % 3] as 'green' | 'orange' | 'blue'
      }));
      
      // TODO: Implementar lógica para filtrar cursos do usuário que estão em andamento
      setCoursesInProgress(coursesWithMockProgress);
      
      // Ordenar cursos gratuitos por data de criação (mais recentes primeiro)
      const sortedFreeCourses = coursesData
        .filter(course => course.level === CourseLevel.GRATUITO)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setFreeCourses(sortedFreeCourses);
      
      // TODO: Implementar lógica para filtrar cursos recomendados
      // Ordenar cursos recomendados por data de criação (mais recentes primeiro)
      const sortedRecommendedCourses = coursesData
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setRecommendedCourses(sortedRecommendedCourses);
    };
    fetchCourses();
  }, []);

  // Dados mockados para eventos
  const events: Event[] = [
    {
      id: '1',
      title: 'Aulão ao vivo Licitações',
      description: 'Materi sangat mudah di pahami dan lorem ipsum dolor sit amet consectetur adipiscing elit.',
      provider: 'SENASP',
      date: '25 de março',
      time: '20:00',
      link: '/eventos/1',
      status: 'webinário',
      institution: 'SENASP'
    },
    {
      id: '2',
      title: 'Aulão ao vivo Licitações',
      description: 'Materi sangat mudah di pahami dan lorem ipsum dolor sit amet consectetur adipiscing elit.',
      provider: 'SENASP',
      date: '25 de março',
      time: '20:00',
      link: '/eventos/2',
      status: 'webinário',
      institution: 'SENASP'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Header */}
      <div className="lg:col-span-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Olá, {user?.name?.split(' ')[0] || 'Usuário'}
          </h1>
          <p className="text-gray-600 mt-1">
            Vamos aprender algo novo hoje!
          </p>
        </div>
      {/* Conteúdo principal - 2/3 da largura */}
      <div className="lg:col-span-2 space-y-6">

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-orange-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Cursos iniciados</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Cursos concluídos</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">10</div>
                <div className="text-sm text-gray-600">Cursos disponíveis</div>
              </div>
            </div>
          </div>
        </div>
          {/* Continue seus estudos */}
          <CourseList 
            courses={coursesInProgress}
            title="Continue seus estudos"
            showPagination={true}
            cardType="withProgress"
            itemsPerPage={2}
            navigation={useCourseNavigation({
              baseUrl: '/aluno/cursos',
              useRouter: true,
            })}
          />

      </div>
      {/* Sidebar - 1/3 da largura */}
      <div className="lg:col-span-1">
        <EventList 
          events={events}
          title="Seus eventos"
          showViewAll={true}
          viewAllLink="/aluno/eventos"
          showExploreButton={true}
          exploreButtonLink="/aluno/eventos"
        />
      </div>
      <div className="lg:col-span-3 space-y-6">
        {/* Cursos para você */}
        <CourseList 
          courses={recommendedCourses}
          title="Cursos novos"
          cardType="default"
          navigation={useCourseNavigation({
            baseUrl: '/aluno/cursos',
            useRouter: true,
          })}
        />

        {/* Cursos gratuitos */}
          <CourseList 
            courses={freeCourses}
            title="Cursos gratuitos"
            showPagination={true}
            cardType="default"
            navigation={useCourseNavigation({
              baseUrl: '/aluno/cursos',
              useRouter: true,
            })}
          />
      </div>
    </div>
  );
};

export default StudentDashboard;
