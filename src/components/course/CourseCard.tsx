'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TruncatedText from '@/components/ui/TruncatedText';
import { BookOpenIcon, BuildingOffice2Icon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import { Course } from '@/types/course';

export interface CourseCardProps {
  course: Course;
  // Props de navegação
  navigation?: {
    enabled: boolean;
    baseUrl?: string;
    useRouter?: boolean;
    onClick?: (id: string) => void;
  };
  // Status do curso
  status?: 'completed' | 'in-progress' | 'exclusive' | 'open';
}

const fallbackImage = '/images/curso.svg';

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  navigation,
  status
}) => {
  const router = useRouter();
  
  // Usar a API route local em vez da URL HTTP direta
  const imgSrc = course.thumbnail && course.thumbnail !== '' 
    ? `/api/images/courses/thumbnail/${course.thumbnail}` 
    : fallbackImage;

  const handleClick = () => {
    if (!navigation?.enabled) return;

    if (navigation.onClick) {
      navigation.onClick(course.id);
      return;
    }

    if (navigation.useRouter) {
      const url = navigation.baseUrl ? `${navigation.baseUrl}/${course.id}` : `/aluno/cursos/${course.id}`;
      router.push(url);
      return;
    }
  };

  const getStatusTag = () => {
    if (!status) return null;

    const statusConfig = {
      completed: { label: 'Concluído', color: 'bg-green-500' },
      'in-progress': { label: 'Em andamento', color: 'bg-orange-500' },
      exclusive: { label: 'Exclusivo para Credenciados', color: 'bg-blue-500' },
      open: { label: 'Aberto', color: 'bg-gray-500' }
    };

    const config = statusConfig[status];
    if (!config) return null;

    return (
      <div className={`absolute top-2 left-2 ${config.color} text-white text-xs px-2 py-1 rounded-full`}>
        <TruncatedText
          text={config.label}
          className="text-white text-xs"
          tooltipPosition="top"
        />
      </div>
    );
  };

  const cardContent = (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow min-w-[280px] w-full">
      {/* Imagem com status tag */}
      <div className="relative w-full h-36">
        <Image
          src={imgSrc}
          alt={`Curso ${course.name}`}
          unoptimized={true}
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {getStatusTag()}
      </div>
      
      {/* Título - truncado */}
      <div className="flex items-start w-full">
        <div className="min-w-0 flex-1">
          <TruncatedText
            text={course.name}
            maxLength={50}
            className="font-semibold text-[#141522] leading-tight block w-full"
            tooltipPosition="top"
          />
        </div>
      </div>
      
      {/* Categoria - truncada */}
      <div className="w-full">
        <TruncatedText
          text={course.category?.name || 'Sem categoria'}
          maxLength={25}
          className="text-[#04A4F4] text-xs font-medium w-full"
          tooltipPosition="top"
        />
      </div>
      
      {/* Status, rating e detalhes */}
      <div className="flex items-center gap-2 justify-between">
        <div className="min-w-0">
          <TruncatedText
            text={course.level}
            className="text-[#9C9CA4] text-xs w-full"
            tooltipPosition="top"
          />
        </div>
        {/* Estrelas */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-yellow-400">
            <StarIcon className="w-4 h-4" fill='currentColor'/>
          </span>
          <TruncatedText
            text={course.rating ? course.rating.toString() : 'Não avaliado'}
            className="text-[#141522] text-xs"
            tooltipPosition="top"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 justify-between">
        {/* Instituição - truncada */}
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[#141522] flex-shrink-0">
            <BuildingOffice2Icon className="w-4 h-4" />
          </span>
          <div className="min-w-0 flex-1">
            <TruncatedText
              text={course.institution?.name || 'Instituição não informada'}
              className="text-[#4B587C] text-xs block w-full"
              tooltipPosition="top"
            />
          </div>
        </div>
        
        {/* Módulos */}
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[#141522] flex-shrink-0">
            <BookOpenIcon className="w-4 h-4" />
          </span>
          <div className="min-w-0 flex-1">
            <TruncatedText
              text={course.modulesCount ? `${course.modulesCount} Modulos` : 'Sem Módulos'}
              className="text-[#9C9CA4] text-xs block w-full"
              tooltipPosition="top"
            />
          </div>
        </div>
        
        {/* Horas */}
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[#141522] flex-shrink-0">
            <ClockIcon className="w-4 h-4" />
          </span>
          <div className="min-w-0 flex-1">
            <TruncatedText
              text={course.hours}
              className="text-[#9C9CA4] text-xs block w-full"
              tooltipPosition="top"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Se a navegação está habilitada mas não usa router, usar Link
  if (navigation?.enabled && !navigation.useRouter && navigation.baseUrl) {
    return (
      <Link href={`${navigation.baseUrl}/${course.id}`} className="block">
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

export default CourseCard; 