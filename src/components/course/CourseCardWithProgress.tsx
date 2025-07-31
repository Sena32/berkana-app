'use client';
import React from 'react';
import Image from 'next/image';

export interface CourseCardWithProgressProps {
  id: string;
  name: string;
  institution: string;
  rating: number;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
  thumbnail: string;
  image: string;
  progressColor?: 'green' | 'orange' | 'blue';
}

const fallbackImage = '/images/curso.svg';

const CourseCardWithProgress: React.FC<CourseCardWithProgressProps> = ({
  id,
  name,
  institution,
  rating,
  progress,
  thumbnail,
  image,
  progressColor = 'green'
}) => {
  const imgSrc = thumbnail && thumbnail !== '' ? `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/upload/courses/thumbnail/${thumbnail}` : fallbackImage;
  
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
          <span className="text-xs text-gray-600">{institution}</span>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-xs text-gray-600">{rating}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>
              {progress?.completed ?? 0}/{progress?.total ?? 0} Módulos
            </span>
            <span>{progress?.percentage ?? 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${getProgressColor()} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress?.percentage ?? 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardWithProgress; 