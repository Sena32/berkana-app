'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CourseVideoPlayer from './CourseVideoPlayer';
import CourseOverview from './CourseOverview';
import CourseTabs from './CourseTabs';
import CourseProgressSidebar from './CourseProgressSidebar';
import { useCourseDetail } from '@/hooks/useCourseDetail';
import { useRouter } from 'next/navigation';
import { Course, CourseModule, CourseModuleVideo } from '@/types/course';
import CourseVideoPlayerSimple from './CourseVideoPlayerSimple';

interface CourseDetailData extends Course {
  students: number;
  rating: number;
  videoUrl: string;
  reviews: number;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
}

interface CourseDetailPageProps {
  // Props para dados do curso
  courseData?: CourseDetailData;
  courseId?: string;
  moduleId?: string | null;
  autoLoad?: boolean;
  
  // Props de navegação
  backLink?: string;
  
  // Props de comportamento
  isPublic?: boolean;
  
  // Props para módulos (opcional)
  modules?: CourseModule[];
  
  // Props para conteúdo programático (opcional)
  programmaticContent?: string[];
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseData: propCourseData,
  courseId,
  autoLoad = false,
  backLink = '/aluno/meus-cursos',
  isPublic = false,
  moduleId,
  modules: propModules = [],
  programmaticContent: propProgrammaticContent
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  // Hook para carregar dados do curso com funcionalidades de matrícula e progresso
  const { 
    courseData: fetchedCourseData, 
    enrollment,
    modules: fetchedModules,
    currentModule,
    moduleVideos,
    loading, 
    error,
    enrollInCourse,
    completeModule
  } = useCourseDetail({
    courseId: courseId || '',
    moduleId: moduleId || '',
    autoLoad
  });
  console.log('fetchedModules DetailPafe', fetchedModules);
  

  // Usar dados das props ou dados carregados via hook
  const courseData = autoLoad ? fetchedCourseData : propCourseData;
  
  // Usar módulos carregados via hook ou props
  const modules: CourseModule[] = autoLoad ? fetchedModules : propModules;

  // Processar módulos baseado no isPublic e dados reais
  const processModules = (modules: CourseModule[]): CourseModule[] => {
    if (!modules || modules.length === 0) {
      return [];
    }



    // Desbloquear módulos baseado no progresso
    return modules.map((module, index) => ({
      ...module,
      locked: index > 0 && !modules[index - 1]?.completed,
      completed: module.completed || false
    }));
  };

  const processedModules = processModules(modules);
  
  const tabs = [
    { id: 'overview', label: 'Sobre', visible: true },
    { id: 'content', label: 'Conteúdo', visible: !isPublic },
    { id: 'materials', label: 'Material complementar', visible: !isPublic },
    { id: 'certificate', label: 'Certificado', visible: true },
    { id: 'reviews', label: 'Avaliações', visible: true }
  ];

  // Função para continuar para o próximo módulo
  const handleNext = useCallback(async () => {
    if (!courseId || !moduleId || isPublic) return;

    try {
      // Marcar módulo atual como completo
      await completeModule(moduleId);
      
      // Encontrar o próximo módulo
      const currentModuleIndex = processedModules.findIndex(m => m.id === moduleId);
      const nextModule = processedModules[currentModuleIndex + 1];
      
      if (nextModule) {
        // Navegar para o próximo módulo
        router.push(`/aluno/cursos/${courseId}?moduleId=${nextModule.id}`);
      } else {
        // Se for o último módulo, navegar para conclusão do curso
        router.push(`/aluno/cursos/${courseId}/conclusao`);
      }
    } catch (error) {
      console.error('Erro ao continuar para próximo módulo:', error);
    }
  }, [courseId, moduleId, isPublic, processedModules, router, completeModule]);

  const handleEnroll = useCallback(async () => {
    if (!courseId) return;
    
    try {
      await enrollInCourse();
      // Após matricular, redirecionar para o curso
      router.push(`/aluno/cursos/${courseId}`);
    } catch (error) {
      console.error('Erro ao matricular no curso:', error);
      // Aqui você pode mostrar uma notificação de erro para o usuário
    }
  }, [courseId, enrollInCourse, router]);

  const handleContinue = useCallback(() => {
    // TODO: verificar se o usuário está matriculado, se ele tiver autenticado
    if (!isPublic) {
      // Se estiver matriculado, continuar o curso
      if (moduleId) {
        // Se há um módulo específico, continuar nele
        router.push(`/aluno/cursos/${courseId}?moduleId=${moduleId}`);
      } else {
        // Se não há módulo específico, ir para o primeiro módulo disponível
        const firstAvailableModule = processedModules.find(m => !m.locked);
        if (firstAvailableModule) {
          router.push(`/aluno/cursos/${courseId}?moduleId=${firstAvailableModule.id}`);
        } else {
          router.push(`/aluno/cursos/${courseId}`);
        }
      }
    } else {
      // Se não estiver matriculado, ir para o curso (area logada)
      router.push(`/aluno/cursos/${courseId}`);
    }
  }, [courseId, enrollment, router, handleEnroll, moduleId, processedModules]);

  // Função para navegar para um módulo específico
  const handleModuleNavigation = useCallback((targetModuleId: string) => {
    if (!courseId) return;
    
    const targetModule = processedModules.find(m => m.id === targetModuleId);
    if (targetModule && !targetModule.locked) {
      router.push(`/aluno/cursos/${courseId}?moduleId=${targetModuleId}`);
    }
  }, [courseId, processedModules, router]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Link
            href={backLink}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="lg:w-80">
            <div className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Link
            href={backLink}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </Link>
        </div>
        <div className="text-center py-12">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-red-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar curso</h3>
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

  // Se não há dados do curso
  if (!courseData) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Link
            href={backLink}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </Link>
        </div>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Curso não encontrado</h3>
          <p className="text-gray-600">O curso solicitado não foi encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Botão voltar */}
      <div className="flex items-center">
        <Link
          href={backLink}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Conteúdo principal */}
        <div className="flex-1 space-y-6">
          {/* Player de vídeo ou imagem do curso */}
          {isPublic ? (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={courseData.thumbnail || '/images/curso.svg'}
                alt={courseData.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <CourseVideoPlayerSimple 
              videoUrl={currentModule && moduleVideos.length > 0 ? moduleVideos[0].link : 'https://vimeo.com/76979871'}
              autoplay={false}
              loop={false}
              muted={false}
            />
          )}

          {/* Visão geral do curso */}
          <CourseOverview course={courseData} isPublic={isPublic} />

          {/* Abas de conteúdo - sempre exibidas */}
          <CourseTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            courseData={courseData}
            modules={processedModules}
          />
        </div>

        {/* Sidebar de progresso */}
        <div className="lg:w-80">
          <CourseProgressSidebar 
            course={courseData}
            modules={processedModules}
            isPublic={isPublic}
            studentEnrollment={!!enrollment}
            onContinue={handleContinue}
            onEnroll={handleEnroll}
            onNext={handleNext}
            onModuleClick={handleModuleNavigation}
            currentModuleId={moduleId || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 