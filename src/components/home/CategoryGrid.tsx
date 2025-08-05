import React from 'react';
import Image from 'next/image';
import Link from '../common/Link';

const iconMap: Record<string, string> = {
  'Economia e Finanças': '/images/icons/financial-icon.svg',
  'Linguagem e Comunicação': '/images/icons/language-icon.svg',
  'Investigação Criminal': '/images/icons/criminal-icon.svg',
  'Perícia': '/images/icons/investigation-icon.svg',
  'Financiamento, Governança e LGPD': '/images/icons/shield-icon.svg',
  'Saúde e Bem-Estar': '/images/icons/health-icon.svg',
};

const categories = [
  { icon: "📈", title: "Economia e Finanças", desc: "Cursos para turbinar sua gestão financeira pessoal e institucional." },
  { icon: "📝", title: "Linguagem e Comunicação", desc: "Desenvolva habilidades de comunicação e expressão." },
  { icon: "🔫", title: "Investigação Criminal", desc: "Aprofunde-se em técnicas de investigação e perícia." },
  { icon: "🔬", title: "Perícia", desc: "Capacite-se em perícia criminal e científica." },
  { icon: "🏛️", title: "Financiamento, Governança e LGPD", desc: "Gestão pública, compliance e proteção de dados." },
  { icon: "❤️", title: "Saúde e Bem-Estar", desc: "Cuide do seu bem-estar físico e mental." },
];

const CategoryGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto w-full py-12 px-4 sm:px-8">
      <span className="text-[#2447F9] font-normal text-sm">Encontre o curso ideal para você</span>
      <h2 className="text-2xl md:text-4xl font-bold text-title-section mb-2 mt-1">Aprimore suas habilidades <p>na sua área de atuação</p></h2>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6 mt-8">
        {categories.map((area, i) => (
          <div key={i} className="p-2 flex gap-4 flex-1 min-w-[320px] max-w-md">
            <div className="bg-[#16285E] rounded-2xl p-8 flex items-center justify-center">
              {iconMap[area.title] ? (
                <Image src={iconMap[area.title]} alt={area.title} width={40} height={40} className="w-10 h-10" />
              ) : (
                <span className="text-4xl text-white">{area.icon}</span>
              )}
            </div>
            <div className="flex flex-col justify-between gap-2 flex-1">
              <h3 className="font-semibold text-[#141522] flex items-center gap-2">
                {area.title}
              </h3>
              <p className="text-[#34364A] text-sm">{area.desc}</p>
              <Link
                type="link"
                variant="link-secondary"
                size="md"
                className="items-start justify-start min-w-0 px-0 py-0 text-right m-0"
                href={`/cursos?categoria=${encodeURIComponent(area.title)}`}
              >
                Explore cursos
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid; 