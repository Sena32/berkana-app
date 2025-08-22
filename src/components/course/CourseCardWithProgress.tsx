'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface CourseCardWithProgressProps {
  id: string;
  name: string;
  institution: string;
  rating: number;
  modulesCount: number;
  level: string;
  categoryName: string;
  thumbnail: string;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  image: string;
  progressColor?: 'green' | 'orange' | 'blue';
  certificateLink?: string;
  // Props de navegação
  navigation?: {
    enabled: boolean;
    baseUrl?: string;
    useRouter?: boolean;
    onClick?: (id: string) => void;
  };
}

const fallbackImage = '/images/curso.svg';

const CourseCardWithProgress: React.FC<CourseCardWithProgressProps> = ({
  id,
  name,
  institution,
  level,
  categoryName,
  rating,
  modulesCount,
  progress,
  thumbnail,
  image,
  progressColor = 'green',
  certificateLink,
  navigation
}) => {
  const router = useRouter();
    
  // Usar a API route local em vez da URL HTTP direta
  const imgSrc = thumbnail && thumbnail !== '' 
    ? `/api/images/courses/thumbnail/${thumbnail}` 
    : fallbackImage;
  const isCompleted = progress?.percentage === 100;
  
  const getProgressColor = () => {
    switch (progressColor) {
      case 'orange':
        return 'bg-orange-500';
      case 'blue':
        return 'bg-blue-500';
      case 'green':
      default:
        return 'bg-[#B5D334]';
    }
  };

  const handleClick = () => {
    if (!navigation?.enabled) return;

    if (navigation.onClick) {
      navigation.onClick(id);
      return;
    }

    if (navigation.useRouter) {
      const url = navigation.baseUrl ? `${navigation.baseUrl}/${id}` : `/aluno/cursos/${id}`;
      router.push(url);
      return;
    }
  };

  const cardContent = (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      {/* Imagem */}
      <div className="relative w-full h-32">
        <Image
          src={imgSrc}
          alt={`Curso ${name}`}
          unoptimized={true}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      
      {/* Conteúdo */}
      <div className="p-4">
        {/* Título */}
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
          {name}
        </h3>
        
        {/* Instituição */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <span className="text-xs text-gray-600">{institution || 'Não informado'}</span>
        </div>
        
        {/* Rating */}
        {rating ? (
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-xs text-gray-600">{rating}</span>
        </div>
          ):(
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xs text-gray-600">Não avaliado</span>
          </div>
        )}
        
        {/* Progress Bar */}
        {progress && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{progress.completed}/{modulesCount} Módulos</span>
              <span>{progress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${getProgressColor()} h-2 rounded-full transition-all duration-300`} 
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Link do certificado para cursos concluídos */}
        {isCompleted && certificateLink && (
          <div onClick={(e) => e.stopPropagation()}>
            <Link
              href={certificateLink}
              className="text-[#04A4F4] text-sm hover:underline transition-colors"
            >
              Acessar meu Certificado
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  // Se a navegação está habilitada mas não usa router, usar Link
  if (navigation?.enabled && !navigation.useRouter && navigation.baseUrl) {
    return (
      <Link href={`${navigation.baseUrl}/${id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  // Se a navegação está habilitada e usa router ou onClick, usar div clicável
  if (navigation?.enabled) {
    return (
      <div onClick={handleClick} className="block">
        {cardContent}
      </div>
    );
  }

  // Se não há navegação, retornar apenas o conteúdo
  return cardContent;
};

export default CourseCardWithProgress; 