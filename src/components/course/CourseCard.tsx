'use client';
import React from 'react';
import Image from 'next/image';

export interface CourseCardProps {
  id: string;
  name: string;
  institution: string;
  modules?: number;
  hours: string;
  rating?: number;
  isActive: boolean;
  thumbnail:string;
  image: string;
  description: string;
}

const fallbackImage = '/images/curso.svg';

const CourseCard: React.FC<CourseCardProps> = ({
  id, name, institution, modules, hours, rating, isActive, thumbnail, image, description
}) => {
  const imgSrc = thumbnail && thumbnail !== '' ? `${process.env.NEXT_PUBLIC_API_URL}/${thumbnail}` : fallbackImage;
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
      {/* Imagem */}
      <div className="relative w-full h-36">
        <Image
          src={imgSrc}
          alt={`Curso ${name}`}
          unoptimized={true}
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      {/* Título */}
      <h3 className="font-semibold text-[#141522]">{name}</h3>
      {/* Categoria */}
      <span className="text-[#04A4F4] text-xs font-medium">Categoria</span>
      {/* Status, rating e detalhes */}
      <div className="flex items-center gap-2 justify-between">
        <span className="text-[#9C9CA4] text-xs">{isActive?'Ativo':'Inativo'}</span>
        {/* Estrelas */}
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-[#141522] text-xs">{rating || 'Não avaliado'}</span>
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
          <span className="text-[#4B587C] text-xs">{modules? `${modules} Módulos`: 'Sem Módulos'}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#141522]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </span>
          <span className="text-[#4B587C] text-xs">{hours}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 