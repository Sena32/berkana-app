'use client';
import React from 'react';
import Link from 'next/link';
import { Event, EventListProps } from '@/types/event';

const EventList: React.FC<EventListProps> = ({
  events,
  title = "Seus eventos",
  showViewAll = true,
  viewAllLink = "/aluno/eventos",
  showExploreButton = true,
  exploreButtonLink = "/aluno/eventos",
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {showViewAll && (
          <Link
            href={viewAllLink}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Ver todos
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Event List */}
      <div className="space-y-4 mb-6">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-3">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Nenhum evento agendado</p>
          </div>
        )}
      </div>

      {/* Explore Button */}
      {showExploreButton && (
        <div className="text-center">
          <Link
            href={exploreButtonLink}
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-gray-900 bg-[#B5D334] rounded-xl hover:bg-[#A0BC2C] transition-colors shadow-sm"
          >
            Explore mais eventos
          </Link>
        </div>
      )}
    </div>
  );
};

// Componente interno para cada evento
interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-b-0">
      {/* Event Title */}
      <h3 className="font-semibold text-gray-900 text-base mb-2">
        {event.title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
        {event.description}
      </p>
      
      {/* Event Details */}
      <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
        {/* Provider */}
        <div className="flex items-center gap-1">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{event.provider}</span>
        </div>
        
        {/* Date */}
        <div className="flex items-center gap-1">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{event.date}</span>
        </div>
        
        {/* Time */}
        <div className="flex items-center gap-1">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{event.time}</span>
        </div>
      </div>
      
      {/* More Information Link */}
      {event.link && (
        <Link
          href={event.link}
          className="text-[#04A4F4] text-sm hover:underline transition-colors"
        >
          Mais informações
        </Link>
      )}
    </div>
  );
};

export default EventList; 