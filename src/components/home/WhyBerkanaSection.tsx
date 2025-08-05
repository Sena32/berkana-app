import React from 'react';
import Image from 'next/image';
import Link from '../common/Link';

const benefits = [
  'Capacitações reconhecidas por instituições públicas e privadas',
  'Estude quando e onde quiser, no seu ritmo',
  'Comprove suas novas habilidades e valorize seu currículo',
  'Aprenda com quem entende do assunto',
  'Acesso fácil e direto aos conteúdos e materiais',
  'Cursos alinhados às demandas do mercado e das instituições',
];

const WhyBerkanaSection: React.FC = () => {
  return (
    <section className="w-full bg-[#F6FAFF] py-16 px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Imagem com arco */}
        <div className="flex-1 flex justify-center relative min-w-[320px]">
          <Image
            src="/images/professor.png"
            alt="Instrutor"
            width={340}
            height={340}
            className="rounded-full object-cover w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
          />
        </div>
        {/* Conteúdo */}
        <div className="flex-1 flex flex-col items-start max-w-xl">
          <span className="text-[#2447F9] font-normal text-sm mb-2">Por que aprender com a Berkana Academy?</span>
          <h2 className="text-2xl md:text-4xl font-bold text-title-section mb-8 leading-tight">Uma plataforma feita para <p>o seu crescimento</p></h2>
          <ul className="space-y-5 mb-10">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-lg text-[#34364A]">
                <span className="mt-1">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#E9FCD4"/><path d="M8 12.5l2.5 2.5L16 9" stroke="#6EDC6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Link
            type="link"
            variant="button-primary"
            size="md"
            className="px-10 py-3 rounded-lg bg-[#CDE53D] text-[#34364A] font-semibold hover:bg-[#B5D334]"
            href="/cadastro"
          >
            Comece agora
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyBerkanaSection; 