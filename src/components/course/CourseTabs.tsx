'use client';
import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface CourseTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  courseData: any;
  programmaticContent: string[];
}

const CourseTabs: React.FC<CourseTabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  courseData, 
  programmaticContent 
}) => {
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
                {programmaticContent.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500 mt-0.5 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'content':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Conteúdo do curso</h3>
            <p className="text-gray-600">Detalhes sobre o conteúdo do curso serão exibidos aqui.</p>
          </div>
        );

      case 'materials':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Material complementar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <span className="text-2xl mb-2">📄</span>
                <span className="font-semibold">Artigo científico</span>
                <a href="#" className="text-[#04A4F4] text-sm mt-2 hover:underline">Download</a>
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <span className="text-2xl mb-2">📊</span>
                <span className="font-semibold">Gestão de Riscos</span>
                <a href="#" className="text-[#04A4F4] text-sm mt-2 hover:underline">Planilha de Excel</a>
              </div>
            </div>
          </div>
        );

      case 'certificate':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Certificado de conclusão</h3>
            <p className="text-gray-600">O certificado de conclusão deste curso é emitido por {courseData.institution}.</p>
          </div>
        );

      case 'reviews':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Avaliações</h3>
            <p className="text-gray-600">Em breve, avaliações de alunos aparecerão aqui.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Abas */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#B5D334] text-[#B5D334]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo da aba */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CourseTabs; 