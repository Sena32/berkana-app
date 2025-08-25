'use client';
import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';
import CourseCardWithProgress from './CourseCardWithProgress';
import CourseCard from './CourseCard';
import { CourseWithOptionalProgress } from './CourseList';
import { useCourseNavigation } from '@/hooks/useCourseNavigation';
import { CourseViewModel } from '@/viewmodels/course/CourseViewModel';
import { UserCourseViewModel } from '@/viewmodels/user-course/UserCourseViewModel';
import { Course, CourseLevel } from '@/types/course';
import { UserCourse } from '@/services/user-course.service';
import Input from '../common/InputField';

const MyCoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [coursesInProgress, setCoursesInProgress] = useState<CourseWithOptionalProgress[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<CourseWithOptionalProgress[]>([]);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { courses: coursesData } = await CourseViewModel.getInstance().listPublicCourses(1);
        // TODO: Implementar lógica para filtrar cursos do usuário que estão em andamento
        setCoursesInProgress(coursesData);
        setCompletedCourses(coursesData);
        // TODO: Implementar lógica para filtrar cursos recomendados
        setRecommendedCourses(coursesData);
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      } finally {
        setLoading(false);
      }

    };
    fetchCourses();
  }, []);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       // Buscar cursos do usuário (em progresso e concluídos)
  //       const userCoursesData = await UserCourseViewModel.getInstance().getUserCourses(1);
        
  //       // Separar cursos por status
  //       const inProgress = userCoursesData.courses.filter(course => course.status === 'IN_PROGRESS');
  //       const completed = userCoursesData.courses.filter(course => course.status === 'COMPLETED');

  //       // Converter para o formato esperado pelos componentes
  //       const inProgressFormatted: CourseWithOptionalProgress[] = inProgress.map(userCourse => ({
  //         ...userCourse.course,
  //         progress: userCourse.progress,
  //         progressColor: 'green'
  //       }));

  //       setCoursesInProgress(inProgressFormatted);
  //       setCompletedCourses(completed.map(uc => uc.course));

  //       // Buscar cursos recomendados (cursos públicos que o usuário não está matriculado)
  //       try {
  //         const recommendedData = await UserCourseViewModel.getInstance().getRecommendedCourses(1);
  //         setRecommendedCourses(recommendedData.courses);
  //       } catch (error) {
  //         console.error('Erro ao carregar cursos recomendados:', error);
  //       }

  //     } catch (error) {
  //       console.error('Erro ao carregar cursos:', error);
  //       setError('Erro ao carregar cursos. Tente novamente.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

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

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Meus cursos</h1>
          <div className="relative max-w-md">
            <Input
              placeholder="Buscar por curso ou instituição"
              disabled
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg bg-gray-100"
              name="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Meus cursos</h1>
        </div>
        <div className="text-center py-12">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-red-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar cursos</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-[#B5D334] text-gray-900 font-medium rounded-lg hover:bg-[#A0BC2C] transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

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