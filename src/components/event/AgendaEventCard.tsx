'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/types/event';

interface AgendaEventCardProps {
  event: Event;
  className?: string;
}

const AgendaEventCard: React.FC<AgendaEventCardProps> = ({ event, className = "" }) => {
  // Imagens mockadas para diferentes tipos de eventos
  const getEventImage = (eventId: string) => {
    const images = {
      '1': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop', // Pessoas assistindo palestra
      '2': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop', // Pessoa com walkie-talkie
      '3': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop', // Reunião no escritório
      '4': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop', // Apresentação
      '5': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop', // Engrenagens coloridas
    };
    return images[eventId as keyof typeof images] || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop';
  };

  const formatDate = (dateString: string) => {
    // Converte "Segunda, 1 de Abril 2025" para formato mais legível
    return dateString;
  };

  return (
    <Link href={event.link || `/eventos/${event.id}`} className={`block ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      {/* Imagem do evento */}
      <div className="relative w-full h-32">
        <Image
          src={getEventImage(event.id)}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Fallback para imagem padrão se a imagem não carregar
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop';
          }}
        />
        
        {/* Tag do tipo de evento */}
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          {event.status === 'webinário' ? 'Webinário' : event.status}
        </div>
      </div>
      
      {/* Conteúdo do card */}
      <div className="p-4">
        {/* Título */}
        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description}
        </p>
        
        {/* Data */}
        <p className="text-sm text-gray-700 font-medium mb-3">
          {formatDate(event.date)}
        </p>
        
        {/* Detalhes */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {/* Instituição */}
          <div className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{event.institution}</span>
          </div>
          
          {/* Horário */}
          <div className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
        </div>
              </div>
      </div>
    </Link>
  );
};

export default AgendaEventCard; 