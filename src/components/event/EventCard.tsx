import React from 'react';

export interface EventCardProps {
  title: string;
  date: string;
  time: string;
  description: string;
  status: 'webinário' | 'em breve' | 'concluído';
  institution: string;
}

const statusMap = {
  'webinário': 'bg-warning text-white',
  'em breve': 'bg-primary text-white',
  'concluído': 'bg-success text-white',
};

const EventCard: React.FC<EventCardProps> = ({ title, date, time, description, status, institution }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusMap[status]}`}>{status}</span>
        <span className="ml-auto text-xs text-text-secondary">{date} • {time}</span>
      </div>
      <h3 className="font-semibold text-base text-text-primary truncate" title={title}>{title}</h3>
      <p className="text-xs text-text-secondary mb-1 truncate" title={description}>{description}</p>
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <span>{institution}</span>
      </div>
    </div>
  );
};

export default EventCard; 