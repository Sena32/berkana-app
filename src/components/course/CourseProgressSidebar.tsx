 'use client';
import React from 'react';

interface Module {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
  duration: string;
}

interface CourseData {
  title: string;
  rating: number;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
}

interface CourseProgressSidebarProps {
  course: CourseData;
  modules: Module[];
}

const CourseProgressSidebar: React.FC<CourseProgressSidebarProps> = ({ course, modules }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'current':
        return (
          <div className="w-3 h-3 bg-[#B5D334] rounded-full"></div>
        );
      case 'pending':
        return (
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        );
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'current':
        return 'text-[#B5D334] font-medium';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      {/* Título do curso */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h2>
        <div className="flex items-center gap-1">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-gray-600">{course.rating}</span>
        </div>
      </div>

      {/* Barra de progresso */}
      {course.progress && (
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{course.progress.completed}/{course.progress.total} Módulos</span>
            <span>{course.progress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#B5D334] h-2 rounded-full transition-all duration-300" 
              style={{ width: `${course.progress.percentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Lista de módulos */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">{course.progress?.total || 0} Módulos</h3>
          <span className="text-sm text-gray-600">{course.progress ? `${course.progress.completed}/${course.progress.total}` : '0/0'} Concluídos</span>
        </div>
        
        <div className="space-y-2">
          {modules.map((module) => (
            <div key={module.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              {getStatusIcon(module.status)}
              <div className="flex-1 min-w-0">
                <div className={`text-sm ${getStatusText(module.status)}`}>
                  {module.title}
                </div>
              </div>
              <span className="text-xs text-gray-500">{module.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
          Avaliar o curso
        </button>
        <button className="w-full px-4 py-2 bg-[#B5D334] text-gray-900 rounded-lg hover:bg-[#A0BC2C] transition-colors text-sm font-medium">
          Próximo
        </button>
      </div>
    </div>
  );
};

export default CourseProgressSidebar;