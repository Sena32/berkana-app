'use client';
import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CourseModule, CourseModuleVideo } from '@/types/course';

// Importar a interface Module
interface Module {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending' | 'disabled';
  duration: string;
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
  price: number;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
}

interface CourseProgressSidebarProps {
  course: CourseDetailData;
  modules: CourseModule[];
  isPublic?: boolean;
  studentEnrollment?: boolean;
  onContinue?: () => void;
  onEnroll?: () => void;
  onNext?: () => void;
  onModuleClick?: (moduleId: string) => void;
  currentModuleId?: string;
}

const CourseProgressSidebar: React.FC<CourseProgressSidebarProps> = ({
  course,
  modules,
  isPublic = false,
  studentEnrollment = false,
  onContinue,
  onEnroll,
  onNext,
  onModuleClick,
  currentModuleId
}) => {
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
      case 'disabled':
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
      case 'disabled':
        return 'text-gray-400';
      default:
        return 'text-gray-600';
    }
  };

  const getModuleStatus = (module: CourseModule) => {
    if (isPublic) return 'disabled';
    if (!studentEnrollment) return 'disabled';
    if (module.id === currentModuleId) return 'current';
    if (module.completed) return 'completed';
    if (module.locked) return 'disabled';
    return 'pending';
  };

  const handleModuleClick = useCallback((module: CourseModule) => {
    if (onModuleClick && !module.locked && !isPublic) {
      onModuleClick(module.id);
    }
  }, [onModuleClick, isPublic]);

  const renderModuleItem = (module: CourseModule) => {
    const status = getModuleStatus(module);
    const isClickable = !isPublic && !module.locked && studentEnrollment && onModuleClick;
    const isCurrent = module.id === currentModuleId;
    
    const moduleContent = (
      <div className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
        isClickable ? 'cursor-pointer hover:bg-gray-50' : ''
      } ${isCurrent && studentEnrollment ? 'bg-[#B5D334]/10 border border-[#B5D334]/20' : ''}`}>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium`}>
            {getStatusIcon(status)}
          </div>
          <h4 className={`font-medium text-sm ${
            getStatusText(status)
          }`}>
            {module.title}
          </h4>
        </div>
        <span className={`font-medium text-sm ${
          getStatusText(status)
        }`}>10:00</span>
      </div>
    );

    if (isClickable) {
      return (
        <div 
          key={module.id}
          onClick={() => handleModuleClick(module)}
          className="block"
        >
          {moduleContent}
        </div>
      );
    }

    return (
      <div key={module.id}>
        {moduleContent}
      </div>
    );
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
      {!isPublic && studentEnrollment && course.progress && (
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
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Módulos do curso</h3>
        {modules.map(renderModuleItem)}
      </div>

      {/* Botões de ação */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        {/* Bloco de ação matricular */}
        {!isPublic && !studentEnrollment && course.level === 'PAGO' && (
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-gray-900">{formatCurrency(course.price)}</h3>
            <span className="text-sm text-gray-600">
              Solicite abaixo seu credenciamento para obter mais informações sobre o curso.
            </span>
            <button
              className="w-full bg-[#B5D334] text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-[#A0BC2C] transition-colors"
              onClick={onEnroll}
            >
              Solicitar este curso
            </button>
          </div>
        )}

        {/* Bloco de ação matricular */}
        {!isPublic && !studentEnrollment && course.level === 'GRATUITO' && (
          <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">
            Solicite abaixo seu credenciamento para obter mais informações sobre o curso.
          </span>
          <button
            className="w-full bg-[#B5D334] text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-[#A0BC2C] transition-colors"
            onClick={onEnroll}
          >
            Solicitar este curso
          </button>
        </div>
        )}

        {/* Botão de ação aluno */}
        {!isPublic && studentEnrollment && (
          <button
            onClick={onNext}
            className="w-full bg-[#B5D334] text-gray-900 font-medium py-3 px-4 rounded-lg hover:bg-[#A0BC2C] transition-colors"
          >
            Continuar
          </button>
        )}

        {/* Botão de ação público */}
        {isPublic && (
          <button
            onClick={onContinue}
            className="w-full bg-[#B5D334] text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-[#A0BC2C] transition-colors"
          >
            Inscreva-se
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseProgressSidebar;