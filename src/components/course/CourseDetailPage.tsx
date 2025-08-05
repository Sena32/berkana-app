'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import CourseVideoPlayer from './CourseVideoPlayer';
import CourseOverview from './CourseOverview';
import CourseTabs from './CourseTabs';
import CourseProgressSidebar from './CourseProgressSidebar';

// Importar a interface Module do CourseProgressSidebar
interface Module {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
  duration: string;
}

const CourseDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Dados mockados do curso
  const courseData = {
    id: '1',
    title: 'Combate à Corrupção: Gestão de Riscos',
    institution: 'SENASP',
    category: 'Planejamento, Governança e Integridade',
    students: 500,
    modules: 6,
    duration: '1h 30m',
    rating: 4.5,
    reviews: 200,
    status: 'Autorizado',
    description: 'Capacitar os profissionais do Sistema Único de Segurança Pública - SUSP, no tocante à compreensão da gestão de pessoal e o papel das corregedorias nas Instituições de segurança pública no combate à corrupção.',
    videoUrl: '/videos/course-intro.mp4',
    posterImage: '/images/courses/corruption-combat.jpg',
    progress: {
      completed: 1,
      total: 6,
      percentage: 16
    }
  };

  const modules: Module[] = [
    { id: 1, title: 'Introdução', status: 'completed', duration: '10:00' },
    { id: 2, title: 'Módulo 1 - Lorem ipsum dolor', status: 'current', duration: '10:00' },
    { id: 3, title: 'Módulo 2 - Lorem ipsum', status: 'pending', duration: '10:00' },
    { id: 4, title: 'Teste de conhecimento', status: 'pending', duration: '30:00' },
    { id: 5, title: 'Módulo 3 - Lorem ipsum dolor', status: 'pending', duration: '30:00' },
    { id: 6, title: 'Teste final', status: 'pending', duration: '15:00' }
  ];

  const programmaticContent = [
    'Módulo 1 - Medidas de Correição na Prevenção e Repressão dos Desvios de Conduta.',
    'Módulo 2 - Estrutura Correcional e Educacional com objetivo de prevenção ao Desvio de Conduta.',
    'Módulo 3 - Imagem Institucional, consequências práticas e jurídicas dos desvios de conduta e introdução às práticas correcionais.'
  ];

  const tabs = [
    { id: 'overview', label: 'Visão geral' },
    { id: 'content', label: 'Conteúdo' },
    { id: 'materials', label: 'Material complementar' },
    { id: 'certificate', label: 'Certificado' },
    { id: 'reviews', label: 'Avaliações' }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Conteúdo principal */}
      <div className="flex-1 space-y-6">
        {/* Botão voltar */}
        <div className="flex items-center">
          <Link
            href="/aluno/meus-cursos"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Voltar</span>
          </Link>
        </div>

        {/* Player de vídeo */}
        <CourseVideoPlayer 
          videoUrl={courseData.videoUrl}
          posterImage={courseData.posterImage}
        />

        {/* Visão geral do curso */}
        <CourseOverview course={courseData} />

        {/* Abas de conteúdo */}
        <CourseTabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          courseData={courseData}
          programmaticContent={programmaticContent}
        />
      </div>

      {/* Sidebar de progresso */}
      <div className="lg:w-80">
        <CourseProgressSidebar 
          course={courseData}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default CourseDetailPage; 