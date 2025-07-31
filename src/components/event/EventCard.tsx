'use client';
import React from 'react';
import Link from 'next/link';
import { Event } from '@/types/event';

export interface EventCardProps {
  event: Event;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, className = "" }) => {
  return (
    <div className={`border-b border-gray-100 pb-4 last:border-b-0 ${className}`}>
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

export default EventCard; 