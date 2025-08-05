import React from 'react';

export interface CourseModule {
  title: string;
  description: string;
  duration: string;
}

interface CourseProgramProps {
  modules: CourseModule[];
}

const CourseProgram: React.FC<CourseProgramProps> = ({ modules }) => {
  return (
    <section className="w-full">
      <h3 className="text-xl font-semibold text-text-primary mb-4">Conteúdo programático</h3>
      <ul className="flex flex-col gap-4">
        {modules.map((mod, idx) => (
          <li key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex-1">
              <span className="font-semibold text-primary mr-2">Módulo {idx + 1}:</span>
              <span className="font-medium text-text-primary">{mod.title}</span>
              <p className="text-text-secondary text-sm mt-1">{mod.description}</p>
            </div>
            <span className="text-xs text-text-secondary whitespace-nowrap">{mod.duration}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CourseProgram; 