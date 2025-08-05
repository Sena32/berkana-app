'use client';
import React, { useState, useEffect, useCallback } from 'react';
import CourseList from './CourseList';
import SearchBar from '@/components/common/SearchBar';
import FilterDropdown from '@/components/common/FilterDropdown';
import SortDropdown from '@/components/common/SortDropdown';
import CourseListSkeleton from './CourseListSkeleton';
import Alert from '@/components/common/Alert';
import { CourseViewModel } from '@/viewmodels/course/CourseViewModel';
import { useDebounce } from '@/hooks/useDebounce';
import { Course } from '@/types/course';

const ExploreCoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchCourses = useCallback(async (name: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const nameParam = name && name.length > 3 ? name : "";
      const res = await CourseViewModel.getInstance().listPublicCourses(1, nameParam);
      setCourses(res?.courses || []);
    } catch (err: any) {
      console.error('Erro ao carregar cursos na página de exploração:', err);
      setError("Erro ao carregar cursos. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearch.length === 0) {
      fetchCourses(null);
    }
    if (debouncedSearch.length > 3) {
      fetchCourses(debouncedSearch);
    }
  }, [debouncedSearch, fetchCourses]);

  useEffect(() => {
    fetchCourses(null);
  }, []);

  // Filtrar cursos baseado no termo de busca e categoria
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'senasp' && course.institution.toLowerCase().includes('senasp')) ||
      (selectedCategory === 'berkana' && course.institution.toLowerCase().includes('berkana')) ||
      (selectedCategory === 'language' && course.description.toLowerCase().includes('linguagem')) ||
      (selectedCategory === 'investigation' && course.description.toLowerCase().includes('investigação')) ||
      (selectedCategory === 'rescue' && course.description.toLowerCase().includes('resgate')) ||
      (selectedCategory === 'governance' && course.description.toLowerCase().includes('governança')) ||
      (selectedCategory === 'wellness' && course.description.toLowerCase().includes('bem-estar'));

    return matchesSearch && matchesCategory;
  });

  // Ordenar cursos baseado na seleção
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.rating || 0) - (a.rating || 0);
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'duration':
        // Assumindo que hours está no formato "1h 30m"
        const getHours = (hours: string) => {
          const match = hours.match(/(\d+)h\s*(\d+)?m?/);
          if (match) {
            const h = parseInt(match[1]);
            const m = match[2] ? parseInt(match[2]) : 0;
            return h + m / 60;
          }
          return 0;
        };
        return getHours(a.hours) - getHours(b.hours);
      default:
        return 0;
    }
  });

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

      {/* Estado de loading */}
      {loading && <CourseListSkeleton count={9} />}

      {/* Estado de erro */}
      {error && (
        <div className="max-w-md mx-auto">
          <Alert message={error} variant="error" />
        </div>
      )}

      {/* Lista de cursos */}
      {!loading && !error && (
        <CourseList 
          courses={sortedCourses}
          cardType="default"
          itemsPerPage={9}
          showPagination={true}
          navigation={{
            enabled: true,
            baseUrl: "/aluno/cursos"
          }}
        />
      )}

      {/* Estado vazio */}
      {!loading && !error && sortedCourses.length === 0 && (
        <div className="text-center py-12">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum curso encontrado</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Tente ajustar sua busca ou filtros para encontrar mais cursos.' 
              : 'Não há cursos disponíveis no momento. Tente novamente mais tarde.'}
          </p>
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('popular');
              }}
              className="inline-flex items-center px-4 py-2 bg-[#B5D334] text-gray-900 font-medium rounded-lg hover:bg-[#A0BC2C] transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreCoursesPage;