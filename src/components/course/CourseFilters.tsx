import React from 'react';
import InputField from '@/components/common/InputField';

const mockCategories = [
  { id: 'all', name: 'Todas as categorias' },
  { id: 'finance', name: 'Economia e Finanças' },
  { id: 'communication', name: 'Linguagem e Comunicação' },
  { id: 'investigation', name: 'Investigação Criminal' },
  { id: 'health', name: 'Saúde e Bem-Estar' },
];

const mockInstitutions = [
  { id: 'all', name: 'Todas as instituições' },
  { id: 'senasp', name: 'SENASP' },
  { id: 'berkana', name: 'Berkana' },
];

const mockSort = [
  { id: 'popular', name: 'Mais popular' },
  { id: 'recent', name: 'Mais recente' },
  { id: 'az', name: 'A-Z' },
];

interface CourseFiltersProps {
  onChangeSearch?: (value: string) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ onChangeSearch }) => {
  return (
    <form className="w-full flex flex-col gap-4 md:flex-row md:items-end mb-8" onSubmit={e => e.preventDefault()}>
      <div className="flex-1">
        <InputField
          type="text"
          placeholder="Buscar curso..."
          onChange={e => onChangeSearch?.(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 w-full md:w-auto">
        <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-auto">
          {mockCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-auto">
          {mockInstitutions.map((inst) => (
            <option key={inst.id} value={inst.id}>{inst.name}</option>
          ))}
        </select>
        <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-auto">
          {mockSort.map((sort) => (
            <option key={sort.id} value={sort.id}>{sort.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CourseFilters; 