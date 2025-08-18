'use client';
import React from 'react';
import { CourseModule, CourseModuleVideo } from '@/types/course';

interface Tab {
  id: string;
  label: string;
  visible: boolean;
}

interface CourseDetailData {
  id: string;
  title: string;
  institution: string;
  categoryName: string;
  students: number;
  modulesCount: number;
  duration: string;
  rating: number;
  reviews: number;
  status: string;
  description: string;
  videoUrl?: string;
  posterImage: string;
  thumbnail: string;
  level: string;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
}

interface CourseTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
  courseData: CourseDetailData;
  currentModule?: CourseModule | null;
  moduleVideos?: CourseModuleVideo[];
  modules?: CourseModule[];
  isPublic?: boolean;
}

const CourseTabs: React.FC<CourseTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  courseData,
  currentModule,
  moduleVideos = [],
  modules = [],
  isPublic = false
}) => {
  const handleTabClick = (tabId: string) => {
    if (isPublic || !onTabChange) return;
    onTabChange(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">{courseData.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Conteúdo programático</h3>
              <ul className="space-y-2">
                {modules.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500 mt-0.5 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Conteúdo do curso</h3>
              
              {/* Módulo atual se disponível */}
              {currentModule && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Módulo atual: {currentModule.title}</h4>
                  <p className="text-blue-700 text-sm">
                    Ordem: {currentModule.order} • Status: {currentModule.completed ? 'Concluído' : 'Em andamento'}
                  </p>
                </div>
              )}

              {/* Lista de vídeos do módulo atual */}
              {moduleVideos && moduleVideos.length > 0 ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Vídeos deste módulo</h4>
                  <div className="space-y-3">
                    {moduleVideos.map((video, index) => (
                      <div key={video.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{video.name}</h5>
                            <p className="text-sm text-gray-600">{video.description}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Ordem: {video.order}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">Nenhum vídeo disponível para este módulo</p>
                </div>
              )}

              {/* Informações gerais do curso */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Estrutura do curso</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm">
                    Este curso contém <strong>{courseData.modulesCount}</strong> módulos organizados sequencialmente. 
                    Cada módulo pode conter vídeos, documentos e testes para garantir o aprendizado completo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'materials':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Material complementar</h3>
            
            {/* Material do módulo atual */}
            {currentModule && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Material do módulo: {currentModule.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-200">
                    <span className="text-2xl mb-2">📄</span>
                    <span className="font-semibold text-center">Slides da apresentação</span>
                    <a href="#" className="text-[#04A4F4] text-sm mt-2 hover:underline">Download PDF</a>
                  </div>
                  <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-200">
                    <span className="text-2xl mb-2">📊</span>
                    <span className="font-semibold text-center">Exercícios práticos</span>
                    <a href="#" className="text-[#04A4F4] text-sm mt-2 hover:underline">Download DOC</a>
                  </div>
                </div>
              </div>
            )}

            {/* Material geral do curso */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Material geral do curso</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-200">
                  <span className="text-2xl mb-2">📚</span>
                  <span className="font-semibold text-center">Bibliografia completa</span>
                  <a href="#" className="text-[#04A4F4] text-sm mt-2 hover:underline">Ver referências</a>
                </div>
                <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-200">
                  <span className="text-2xl mb-2">🔗</span>
                  <span className="font-semibold text-center">Links úteis</span>
                  <a href="#" className="text-[#04A4F4] text-sm mt-2 hover:underline">Acessar links</a>
                </div>
              </div>
            </div>
          </div>
        );

      case 'certificate':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Certificado de conclusão</h3>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <div className="text-center">
                  <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Certificado emitido por {courseData.institution}</h4>
                  <p className="text-gray-600 mb-4">
                    Este certificado é emitido automaticamente após a conclusão de todos os módulos do curso.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-green-200">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-700 font-medium">Certificado válido</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações do certificado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Detalhes do certificado</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Instituição:</span>
                    <span className="font-medium">{courseData.institution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Curso:</span>
                    <span className="font-medium">{courseData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duração:</span>
                    <span className="font-medium">{courseData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Módulos:</span>
                    <span className="font-medium">{courseData.modulesCount}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Requisitos para emissão</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500 mt-0.5 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Concluir todos os módulos do curso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500 mt-0.5 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Aprovar nos testes de conhecimento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500 mt-0.5 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ter pelo menos 80% de presença</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Avaliações dos alunos</h3>
              
              {/* Estatísticas das avaliações */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{courseData.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="20" height="20" fill="currentColor" viewBox="0 0 20 20" className="text-yellow-400">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Avaliação geral</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{courseData.reviews}</div>
                    <p className="text-sm text-gray-600">Total de avaliações</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{courseData.students}</div>
                    <p className="text-sm text-gray-600">Alunos matriculados</p>
                  </div>
                </div>
              </div>

              {/* Placeholder para avaliações futuras */}
              <div className="text-center py-8">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-gray-500">As avaliações dos alunos aparecerão aqui em breve</p>
                <p className="text-sm text-gray-400 mt-2">Seja o primeiro a avaliar este curso!</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Tabs header */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.filter((tab) => tab.visible).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              disabled={isPublic}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors rounded-none ${
                activeTab === tab.id
                  ? 'border-[#B5D334] text-[#B5D334]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } ${isPublic ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {renderTabContent()}
        
        {/* Botão "Começar" para cursos públicos */}
        {isPublic && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full bg-[#B5D334] text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-[#A0BC2C] transition-colors">
              Começar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTabs; 