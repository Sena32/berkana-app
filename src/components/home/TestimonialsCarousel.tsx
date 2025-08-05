'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { mockTestimonials } from '@/mocks/testimonial-mock';

const fallbackAvatar = '/images/user/user-default.svg';

const TestimonialsCarousel: React.FC = () => {
  // Duplicar os cards para efeito de rolagem infinita
  const testimonials = [...mockTestimonials, ...mockTestimonials];
  const marqueeRef = useRef<HTMLDivElement>(null);

  // CSS para animação de rolagem infinita
  // Pausa ao hover
  // (Tailwind não cobre keyframes customizados, então uso style inline)
  return (
    <section className="w-full bg-[#1B2B4B] py-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-12">
        <span className="text-[#B6E13B] font-normal text-sm mb-2">Mais de 2000 alunos</span>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Quem já estudou com a gente recomenda!</h2>
        <span className="text-gray-300 font-normal text-base max-w-2xl">Nossos cursos geram impacto real na vida profissional dos alunos. Veja o que eles têm a dizer!</span>
      </div>
      <div
        className="relative w-full overflow-x-hidden"
        onMouseEnter={() => {
          if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'paused';
        }}
        onMouseLeave={() => {
          if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'running';
        }}
      >
        <div
          ref={marqueeRef}
          className="flex flex-nowrap gap-8 items-stretch"
          style={{
            animation: 'marquee 32s linear infinite',
            minWidth: 'max-content',
          }}
        >
          {testimonials.map((t, idx) => {
            const avatarSrc = t.avatar || fallbackAvatar;
            return (
              <div
                key={t.id + '-' + idx}
                className="bg-white rounded-2xl p-6 shadow flex flex-col items-start min-w-[320px] max-w-xs h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={avatarSrc}
                    alt={`Foto do aluno ${t.name}`}
                    width={56}
                    height={56}
                    className="rounded-full w-14 h-14 object-cover"
                  />
                  <div>
                    <span className="font-bold text-base text-[#1B2B4B] block">{t.name}</span>
                    <span className="text-[#4B587C] text-xs font-medium block">{t.role}</span>
                  </div>
                </div>
                <p className="text-[#1B2B4B] text-sm font-normal mb-0 text-left">{t.testimonial}</p>
              </div>
            );
          })}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default TestimonialsCarousel; 