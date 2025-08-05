import React from 'react';
import Image from 'next/image';

const partners = [
  { src: '/images/partner-marinha.png', alt: 'Marinha do Brasil' },
  { src: '/images/partner-policia-federal.png', alt: 'Polícia Federal' },
  { src: '/images/partner-governo.png', alt: 'Governo Federal' },
  { src: '/images/partner-1.png', alt: 'Defesa Civil' },
  { src: '/images/partner-policia-militar.png', alt: 'Polícia Militar' },
  { src: '/images/partner-2.png', alt: 'Instituto Federal' },
];

const PartnersSection: React.FC = () => {
  return (
    <section className="w-full bg-[#F6FAFF] py-2 px-0">
      <div className="max-w-7xl flex flex-row items-center gap-2 md:gap-5 lg:gap-10 px-2 md:px-8">
        {partners.map((partner) => (
          <Image
            key={partner.src}
            src={partner.src}
            alt={partner.alt}
            width={72}
            height={72}
            className="h-16 w-auto object-contain grayscale opacity-70"
            loading="lazy"
            priority={false}
          />
        ))}
        <span className="text-[1.5rem] font-bold text-[#A6A8B1] leading-tight whitespace-pre-line text-right select-none" style={{lineHeight: '1.1'}}>
          +50 grandes
          <br />instituições
        </span>
      </div>
    </section>
  );
};

export default PartnersSection; 