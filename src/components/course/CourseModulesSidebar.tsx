import React from 'react';

interface Module {
  title: string;
  status: 'concluído' | 'atual' | 'pendente';
  duration: string;
}

interface CourseModulesSidebarProps {
  modules: Module[];
  current: number;
  onNext?: () => void;
  onReview?: () => void;
}

const statusMap = {
  'concluído': 'text-success',
  'atual': 'text-primary font-semibold',
  'pendente': 'text-gray-400',
};

const CourseModulesSidebar: React.FC<CourseModulesSidebarProps> = ({ modules, current, onNext, onReview }) => {
  const progress = Math.round(((current + 1) / modules.length) * 100);
  return (
    <aside className="bg-white rounded-2xl shadow p-4 flex flex-col gap-4 w-full md:w-72 mb-6 md:mb-0">
      <h3 className="text-lg font-bold text-text-primary mb-2">Módulos</h3>
      <div className="flex flex-col gap-2">
        {modules.map((mod, idx) => (
          <div key={idx} className={`flex items-center gap-2 px-2 py-1 rounded ${idx === current ? 'bg-primary/10' : ''}`}>
            <span className={`w-2 h-2 rounded-full ${mod.status === 'concluído' ? 'bg-success' : mod.status === 'atual' ? 'bg-primary' : 'bg-gray-300'}`}></span>
            <span className={`flex-1 truncate ${statusMap[mod.status]}`}>{mod.title}</span>
            <span className="text-xs text-text-secondary ml-2">{mod.duration}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-xs text-text-secondary">{progress}% concluído</span>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <button
          className="bg-primary text-white font-semibold rounded-lg px-4 py-2 text-sm shadow hover:bg-primary/90 transition-colors"
          onClick={onNext}
        >
          Próximo
        </button>
        <button
          className="bg-white border border-primary text-primary font-semibold rounded-lg px-4 py-2 text-sm shadow hover:bg-primary/10 transition-colors"
          onClick={onReview}
        >
          Avaliar o curso
        </button>
      </div>
    </aside>
  );
};

export default CourseModulesSidebar; 