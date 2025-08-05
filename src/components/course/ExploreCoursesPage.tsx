'use client';
import React, { useState } from 'react';
import CourseList from './CourseList';
import SearchBar from '@/components/common/SearchBar';
import FilterDropdown from '@/components/common/FilterDropdown';
import SortDropdown from '@/components/common/SortDropdown';
import { CourseCardProps } from './CourseCard';
import { CourseWithOptionalProgress } from './CourseList';

const ExploreCoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Dados mockados dos cursos
  const courses: CourseWithOptionalProgress[] = [
    {
    id: '1',
    name: 'Inglês Instrumental',
    institution: 'SENASP',
    modules: 5,
    hours: '1h 30m',
    rating: 4.5,
    isActive: true,
    thumbnail: '',
    image: '/images/courses/english.jpg',
    description: 'Linguagem de Comunicação',
    status: 'completed'
    },
    {
    id: '2',
    name: 'Investigação Criminal - Aspectos Conceituais',
    institution: 'SENASP',
    modules: 5,
    hours: '1h 30m',
    rating: 4.5,
    isActive: true,
    thumbnail: '',
    image: '/images/courses/criminal-investigation.jpg',
    description: 'Investigação Criminal',
    status: 'exclusive'
    },
    {
    id: '3',
    name: 'Primeiros Socorros no Ambiente Corporativo',
    institution: 'Berkana',
    modules: 5,
    hours: '1h 30m',
    rating: 4.5,
    isActive: true,
    thumbnail: '',
    image: '/images/courses/first-aid.jpg',
    description: 'Salvamento e Resgate e Defesa Civil',
    status: 'in-progress'
    },
    {
      id: '4',
      name: 'Gestão de Conflitos e Eventos Críticos',
      institution: 'Berkana',
      modules: 5,
      hours: '1h 30m',
      rating: 4.5,
      isActive: true,
      thumbnail: '',
      image: '/images/courses/conflict-management.jpg',
      description: 'Gestão de Conflitos e Eventos Críticos'
    },
    {
      id: '5',
      name: 'Qualidade de Vida, Bem-Estar e Saúde',
      institution: 'SENASP',
      modules: 5,
      hours: '1h 30m',
      rating: 4.5,
      isActive: true,
      thumbnail: '',
      image: '/images/courses/wellness.jpg',
      description: 'Qualidade de Vida, Bem-Estar e Saúde'
    },
    {
      id: '6',
      name: 'Salvamento e Resgate e Defesa Civil',
      institution: 'Berkana',
      modules: 5,
      hours: '1h 30m',
      rating: 4.5,
      isActive: true,
      thumbnail: '',
      image: '/images/courses/rescue.jpg',
      description: 'Salvamento e Resgate e Defesa Civil'
    },
    {
      id: '7',
      name: 'Língua e Comunicação',
      institution: 'SENASP',
      modules: 5,
      hours: '1h 30m',
      rating: 4.5,
      isActive: true,
      thumbnail: '',
      image: '/images/courses/communication.jpg',
      description: 'Linguagem de Comunicação'
    },
    {
      id: '8',
      name: 'Planejamento, Governança e Integridade',
      institution: 'SENASP',
      modules: 5,
      hours: '1h 30m',
      rating: 4.5,
      isActive: true,
      thumbnail: '',
      image: '/images/courses/governance.jpg',
      description: 'Planejamento, Governança e Integridade'
    },
    {
      id: '9',
      name: 'Combate à Corrupção: Gestão de Riscos',
      institution: 'SENASP',
      modules: 5,
      hours: '1h 30m',
      rating: 4.5,
      isActive: true,
      thumbnail: '',
      image: '/images/courses/corruption-combat.jpg',
      description: 'Planejamento, Governança e Integridade'
    }
  ];

  // Filtrar cursos baseado no termo de busca
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Explorar cursos</h1>
      </div>

      {/* Barra de busca e filtros */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Barra de busca */}
        <div className="flex-1 w-full lg:w-auto">
          <SearchBar
            placeholder="Buscar por curso ou instituição"
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        {/* Filtros e ordenação */}
        <div className="flex gap-3">
          <FilterDropdown
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={[
              { value: 'all', label: 'Todos' },
              { value: 'senasp', label: 'SENASP' },
              { value: 'berkana', label: 'Berkana' },
              { value: 'language', label: 'Linguagem de Comunicação' },
              { value: 'investigation', label: 'Investigação Criminal' },
              { value: 'rescue', label: 'Salvamento e Resgate' },
              { value: 'governance', label: 'Governança e Integridade' },
              { value: 'wellness', label: 'Bem-Estar e Saúde' }
            ]}
          />

          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: 'popular', label: 'Mais popular' },
              { value: 'recent', label: 'Mais recente' },
              { value: 'rating', label: 'Melhor avaliado' },
              { value: 'duration', label: 'Menor duração' }
            ]}
          />
        </div>
      </div>

      {/* Lista de cursos */}
      <CourseList 
        courses={filteredCourses}
        cardType="default"
        itemsPerPage={9}
        showPagination={true}
        navigation={{
          enabled: true,
          baseUrl: "/aluno/cursos"
        }}
      />
    </div>
  );
};

export default ExploreCoursesPage;