import React from 'react';

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

const CourseFilters: React.FC = () => {
  return (
    <form className="w-full flex flex-col md:flex-row gap-4 items-stretch md:items-end mb-8">
      <input
        type="text"
        placeholder="Buscar curso ou instituição..."
        className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
        {mockCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
        {mockInstitutions.map((inst) => (
          <option key={inst.id} value={inst.id}>{inst.name}</option>
        ))}
      </select>
      <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
        {mockSort.map((sort) => (
          <option key={sort.id} value={sort.id}>{sort.name}</option>
        ))}
      </select>
    </form>
  );
};

export default CourseFilters; 