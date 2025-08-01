'use client';
import React, { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import FilterDropdown from '@/components/common/FilterDropdown';
import SortDropdown from '@/components/common/SortDropdown';
import AgendaEventCard from './AgendaEventCard';
import { Event } from '@/types/event';

const AgendaPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Dados mockados para eventos próximos
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'LAAD 2024',
      description: 'Um dos maiores eventos de Segurança e Defesa da América Latina.',
      provider: 'SENASP',
      date: 'Segunda, 1 de Abril 2025',
      time: '8h 30m - 17h',
      status: 'webinário',
      institution: 'SENASP',
      link: '/eventos/1'
    },
    {
      id: '2',
      title: 'Gestão de Segurança',
      description: 'Um dos maiores eventos de Segurança e Defesa da América Latina.',
      provider: 'SENASP',
      date: 'Segunda, 1 de Abril 2025',
      time: '8h 30m - 17h',
      status: 'webinário',
      institution: 'SENASP',
      link: '/eventos/2'
    }
  ];

  // Dados mockados para eventos em breve
  const comingSoonEvents: Event[] = [
    {
      id: '3',
      title: 'LAAD 2024',
      description: 'Um dos maiores eventos de Segurança e Defesa da América Latina.',
      provider: 'SENASP',
      date: 'Segunda, 1 de Abril 2025',
      time: '8h 30m - 17h',
      status: 'webinário',
      institution: 'SENASP',
      link: '/eventos/3'
    },
    {
      id: '4',
      title: 'Gestão de Segurança',
      description: 'Um dos maiores eventos de Segurança e Defesa da América Latina.',
      provider: 'SENASP',
      date: 'Segunda, 1 de Abril 2025',
      time: '8h 30m - 17h',
      status: 'webinário',
      institution: 'SENASP',
      link: '/eventos/4'
    },
    {
      id: '5',
      title: 'Combate à Corrupção: Gestão de Riscos',
      description: 'Um dos maiores eventos de Segurança e Defesa da América Latina.',
      provider: 'SENASP',
      date: 'Segunda, 1 de Abril 2025',
      time: '8h 30m - 17h',
      status: 'webinário',
      institution: 'SENASP',
      link: '/eventos/5'
    }
  ];

  // Filtrar eventos baseado no termo de busca
  const filterEvents = (events: Event[]) => {
    if (!searchTerm) return events;
    
    return events.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredUpcoming = filterEvents(upcomingEvents);
  const filteredComingSoon = filterEvents(comingSoonEvents);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Agenda e eventos</h1>
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
              { value: 'webinario', label: 'Webinário' },
              { value: 'aulao', label: 'Aulão' },
              { value: 'workshop', label: 'Workshop' }
            ]}
          />

          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: 'popular', label: 'Mais popular' },
              { value: 'recent', label: 'Mais recente' },
              { value: 'date', label: 'Data' }
            ]}
          />
        </div>
      </div>

      {/* Seus próximos eventos */}
      {filteredUpcoming.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Seus próximos eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUpcoming.map((event) => (
              <AgendaEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Em breve */}
      {filteredComingSoon.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Em breve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComingSoon.map((event) => (
              <AgendaEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {filteredUpcoming.length === 0 && filteredComingSoon.length === 0 && (
        <div className="text-center py-12">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-4 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Tente ajustar sua busca ou explore nossos eventos disponíveis.' : 'Você ainda não possui eventos agendados. Fique atento aos próximos lançamentos!'}
          </p>
        </div>
      )}
    </div>
  );
};



export default AgendaPage; 