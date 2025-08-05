import React from 'react';

interface CourseHeroProps {
  title: string;
  image: string;
  institution: string;
  modules: number;
  duration: string;
  rating: number;
  status: 'in-progress' | 'open' | 'completed' | 'locked';
  description: string;
}

const statusMap = {
  'in-progress': { label: 'Em andamento', color: 'bg-warning text-white' },
  'open': { label: 'Aberto', color: 'bg-success text-white' },
  'completed': { label: 'Concluído', color: 'bg-primary text-white' },
  'locked': { label: 'Bloqueado', color: 'bg-gray-300 text-gray-500' },
};

const CourseHero: React.FC<CourseHeroProps> = ({
  title, image, institution, modules, duration, rating, status, description
}) => {
  const statusInfo = statusMap[status];
  return (
    <section className="w-full bg-white rounded-2xl shadow p-4 sm:p-8 flex flex-col md:flex-row gap-8 items-center mb-8">
      <div className="w-full md:w-80 flex-shrink-0 flex justify-center items-center">
        <img
          src={image}
          alt={title}
          className="rounded-xl w-full h-48 md:h-56 object-cover bg-gray-100"
          loading="eager"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <span className={`px-2 py-0.5 rounded text-xs font-semibold w-fit ${statusInfo.color}`}>{statusInfo.label}</span>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">{title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary mb-2">
          <span>{institution}</span>
          <span>• {modules} Módulos</span>
          <span>• {duration}</span>
          <span className="flex items-center gap-1 text-yellow-500 ml-2">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
            {rating}
          </span>
        </div>
        <p className="text-base text-text-secondary mb-4">{description}</p>
        <a
          href="#matricula"
          className="inline-block bg-primary text-white font-semibold rounded-lg px-6 py-3 text-base shadow-md hover:bg-primary/90 transition-colors w-fit"
        >
          {status === 'open' ? 'Matricular-se no curso' : statusInfo.label}
        </a>
      </div>
    </section>
  );
};

export default CourseHero; 