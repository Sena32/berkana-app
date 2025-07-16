import React from 'react';

interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
}

const stats: Stat[] = [
  { label: 'Cursos iniciados', value: 10, icon: <span role="img" aria-label="Iniciado">🚀</span>, bg: 'bg-primary/10' },
  { label: 'Cursos concluídos', value: 3, icon: <span role="img" aria-label="Concluído">✅</span>, bg: 'bg-success/10' },
  { label: 'Cursos disponíveis', value: 10, icon: <span role="img" aria-label="Disponível">📚</span>, bg: 'bg-warning/10' },
];

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className={`flex items-center gap-4 rounded-2xl p-4 ${stat.bg}`}>
          <div className="text-3xl">{stat.icon}</div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
            <span className="text-sm text-text-secondary">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats; 