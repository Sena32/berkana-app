'use client';
import React from 'react';
import Image from 'next/image';

export interface CourseCardProps {
  id: string;
  title: string;
  institution: string;
  modules: number;
  duration: string;
  rating: number;
  status: 'in-progress' | 'open' | 'completed' | 'locked';
  image: string;
  description: string;
}

const statusMap = {
  'in-progress': { label: 'Em andamento', color: 'bg-warning-500 text-white' },
  'open': { label: 'Aberto', color: 'bg-success-500 text-white' },
  'completed': { label: 'Concluído', color: 'bg-primary text-white' },
  'locked': { label: 'Bloqueado', color: 'bg-gray-300 text-gray-500' },
};

const fallbackImage = '/images/curso.svg';

const CourseCard: React.FC<CourseCardProps> = ({
  id, title, institution, modules, duration, rating, status, image, description
}) => {
  const statusInfo = statusMap[status];
  const imgSrc = image && image !== '' ? image : fallbackImage;
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
      {/* Imagem */}
      <img src={imgSrc} alt={`Curso ${title}`} className="rounded-lg h-36 w-full object-cover" />
      {/* Título */}
      <h3 className="font-semibold text-[#141522]">{title}</h3>
      {/* Categoria */}
      <span className="text-[#04A4F4] text-xs font-medium">Categoria</span>
      {/* Status, rating e detalhes */}
      <div className="flex items-center gap-2 justify-between">
        <span className="text-[#9C9CA4] text-xs">{statusInfo.label}</span>
        {/* Estrelas */}
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-[#141522] text-xs">{rating}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[#141522]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span className="text-[#4B587C] text-xs">{institution}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#141522]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </span>
          <span className="text-[#4B587C] text-xs">{modules} Módulos</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#141522]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </span>
          <span className="text-[#4B587C] text-xs">{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 