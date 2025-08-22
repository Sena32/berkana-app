import React from 'react';
import Image from 'next/image';
import Link from '../common/Link';
import HeroBadges from './hero-badges';

interface HeroSectionProps {
  headline?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
}


const badgeImages = [
  { src: '/images/students-active-icon.png', alt: '3600+ Alunos ativos', label: '3600', subLabel: 'Alunos ativos' },
  { src: '/images/video-icon.png', alt: '200+ Cursos e treinamentos', label: '200', subLabel: 'Cursos e treinamentos' },
];

const HeroSection: React.FC<HeroSectionProps> = ({
  headline = 'Desenvolva suas habilidades.\nCresça na sua carreira.',
  subtitle = 'Capacitação de qualidade para servidores e colaboradores. Aprenda no seu ritmo com cursos abertos e exclusivos, credenciados por instituições públicas e privadas.',
  ctaLabel = 'Explorar cursos',
  ctaHref = '/cursos',
  imageSrc = '/images/hero-woman.svg'
}) => {
  return (
    <section className="w-full  pt-8 pb-6 px-4 sm:pt-12 sm:pb-10 sm:px-8 md:pt-16 md:pb-16 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
      {/* Texto */}
      <div className="flex-1 flex flex-col items-start max-w-xl gap-4 md:gap-6">
      <span className="text-[#2447F9] font-normal text-sm">#CrescimentoProfissional</span>
        <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight md:leading-tight whitespace-pre-line text-title-section">
          {headline}
        </h1>
        <p className="text-base md:text-lg mb-2 md:mb-6 max-w-lg text-[#5B6478]">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Link
            type="link"
            variant="button-primary"
            size="md"
            className="min-w-[170px]"
            href={ctaHref}
          >
            {ctaLabel}
          </Link>
          <Link
            type="link"
            variant="button-outline"
            size="md"
            className="min-w-[170px]"
            href="/entrar"
          >
            Começar agora
          </Link>
        </div>
      </div>
      {/* Imagem com badges sobrepostos */}
      <div className="flex-1 flex justify-center md:justify-end w-full md:w-auto mt-8 md:mt-0 relative">
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt="Profissional capacitado Berkana"
            width={384}
            height={384}
            className="rounded-full object-cover w-64 h-64 md:w-96 md:h-96 relative z-10 shadow-theme-lg"
            priority
          />
          {/* Badges sobrepostos - só aparecem em md+ */}
          <div className="hidden md:flex flex-col gap-4 absolute left-[30px] bottom-[18px] z-20 w-[260px]">
            {badgeImages.map((badge, idx) => (
              <HeroBadges
                key={badge.src}
                imageSrc={badge.src}
                alt={badge.alt}
                width={100}
                height={50}
                className="w-full h-[70px]"
                label={badge.label}
                subLabel={badge.subLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 